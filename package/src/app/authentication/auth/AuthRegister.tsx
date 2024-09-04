import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

interface registerType {
    title?: string;
    subtitle?: JSX.Element | JSX.Element[];
    subtext?: JSX.Element | JSX.Element[];
}

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string | null>(null);
    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        if (validateEmail(value)) {
            setEmailError(null);
        } else {
            setEmailError("Please enter a valid email address.");
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        if (value.length < 5) {
            setPasswordError("Password must be at least 5 characters long.");
        } else {
            setPasswordError(null);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (emailError || !validateEmail(email)) {
            setFormError("Please enter a valid email address.");
        } else if (passwordError || password.length < 5) {
            setFormError("Please ensure all fields are filled out correctly.");
        } else {
            setFormError(null);
            // Redirect to sign-in page
            window.location.href = "/authentication/login";
            console.log("Form submitted successfully!");
        }
    };

    return (
        <>
            {title && (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            )}

            {subtext}

            <Box component="form" onSubmit={handleSubmit}>
                <Stack mb={3}>
                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor='username' mb="5px">
                        Username
                    </Typography>
                    <CustomTextField id="username" variant="outlined" fullWidth required />

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">
                        Email
                    </Typography>
                    <CustomTextField
                        id="email"
                        variant="outlined"
                        fullWidth
                        required
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="example@example.com"
                        error={!!emailError}
                        helperText={emailError}
                    />

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">
                        Password
                    </Typography>
                    <CustomTextField
                        id="password"
                        variant="outlined"
                        fullWidth
                        required
                        type={passwordVisible ? "text" : "password"}
                        value={password}
                        onChange={handlePasswordChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={togglePasswordVisibility}
                                        edge="end"
                                        aria-label="toggle password visibility"
                                    >
                                        {passwordVisible ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        error={!!passwordError}
                        helperText={passwordError}
                    />

                    {formError && (
                        <Typography color="error" variant="body2" mt="15px">
                            {formError}
                        </Typography>
                    )}
                </Stack>
                <Button color="primary" variant="contained" size="large" fullWidth type="submit">
                    Sign Up
                </Button>
            </Box>
            {subtitle}
        </>
    );
};

export default AuthRegister;
