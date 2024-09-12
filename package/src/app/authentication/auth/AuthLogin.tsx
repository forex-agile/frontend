import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Button, Stack } from "@mui/material";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";

interface LoginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin: React.FC<LoginType> = ({ title, subtitle, subtext }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  // Ensure the component is mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("User login");

    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    const credentials = btoa(`${username}:${password}`);
    const headers = {
      Authorization: `Basic ${credentials}`,
    };

    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const endpoint = "/api/v1/login";
    const url = `${baseURL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
      });

      console.log("Response:", response);

      if (response.ok) {
        const data = await response.json();
        const { user, token } = data;

        // Save the token and userId to local storage
        localStorage.setItem("user", JSON.stringify({
          id: user.id,
          username: user.username,
          portfolioId: user.portfolioId,
        }));
        localStorage.setItem("token", token);
        // Check localStorage items
        console.log("User:", localStorage.getItem("user"));
        console.log("Token:", localStorage.getItem("token"));

        // Get the user item from localStorage
        const userItem = localStorage.getItem('user');

        // Parse the JSON string back into an object
        const userObject = JSON.parse(userItem);

        // Access the portfolioId
        const portfolioId = userObject.portfolioId;

        console.log("Portfolio ID:", portfolioId);

        // Redirect to the home page
        if (isMounted) {
          router.push("/");
        }

      } else {
        console.log("Response Status:", response.status);
        const errorMessage = await response.text();
        console.log("Error Message:", errorMessage);

        if (response.status === 400) {
          setError("Authorization header is missing or invalid.");
        } else if (response.status === 401) {
          setError("Unauthorized. Please check your credentials.");
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      setError("An error occurred during login. Please try again later.");
    }
  };

  // TODO: Restrict access to home page
  return (
    <>
      {title && (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      )}

      {subtext}

      <form onSubmit={handleLogin}>
        <Stack>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="username"
              mb="5px"
            >
              Username
            </Typography>
            <CustomTextField
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Box>
          <Box mt="25px">
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="password"
              mb="5px"
            >
              Password
            </Typography>
            <CustomTextField
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
        </Stack>

        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}

        <Box mt={3}>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            Sign In
          </Button>
        </Box>
      </form>

      {subtitle}
    </>
  );
};

export default AuthLogin;

