import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, InputAdornment, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

interface registerType {
    title?: string;
    subtitle?: JSX.Element | JSX.Element[];
    subtext?: JSX.Element | JSX.Element[];
}

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {

    // Form data
    const [username, setUsername] = useState<string>(''); 
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // Error
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [formError, setFormError] = useState<string | null>(null);

    //Password Toggle
    const [passwordVisible, setPasswordVisible] = useState(false);

    // Success Message
    const [openDialog, setOpenDialog] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value); // Update the username state
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

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
        const endpoint = "/api/v1/register";
        const url = `${baseURL}${endpoint}`;
    
        if (emailError || !validateEmail(email)) {
            setFormError("Please enter a valid email address.");
        } else if (passwordError || password.length < 5) {
            setFormError("Please ensure all fields are filled out correctly.");
        } else {
            setFormError(null);
            const formData = { username: username, email: email, password: password };
            

            try {
                console.log(formData)

                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                setOpenDialog(true); // Open the success dialog
    
            } catch (error) {
                console.error("Error submitting the form:", error);
                setFormError("There was an issue submitting the form. Please try again.");
            }
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        window.location.href = "/authentication/login";  // Redirect after closing the dialog
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
                    <CustomTextField 
                        id="username" 
                        variant="outlined" 
                        fullWidth 
                        required
                        value={username}
                        onChange={handleUsernameChange} />

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

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                sx={{ '& .MuiDialog-paper': { width: '400px', maxWidth: '100%' } }}
            >
                <DialogTitle sx={{ backgroundColor: '#3f51b5', color: '#fff', padding: '10px' }}>
                    Success
                </DialogTitle>
                <DialogContent>
                    <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold', marginTop: '30px', color: 'green' }}>
                        Account created successfully!
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', padding: '16px' }}>
                    <Button onClick={handleCloseDialog} color="primary" variant="contained">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    );
};

export default AuthRegister;
