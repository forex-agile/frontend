import React from 'react';
import { Box, Typography, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Link  from 'next/link';

import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

interface registerType {
    title?: string;
    subtitle?: JSX.Element | JSX.Element[];
    subtext?: JSX.Element | JSX.Element[];
  }

const AuthRegister = ({ title, subtitle, subtext }: registerType) => (
    <>
        {title ? (
            <Typography fontWeight="700" variant="h2" mb={1}>
                {title}
            </Typography>
        ) : null}

        {subtext}

        <Box>
            <Stack mb={3}> 
                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='name' mb="5px">Username</Typography> 
                <CustomTextField id="name" variant="outlined" fullWidth required/>

                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">Email</Typography>
                <CustomTextField id="email" variant="outlined" fullWidth required/>

                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">Password</Typography>
                <CustomTextField id="password" variant="outlined" fullWidth requited/>

                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='bank_ac_id' mb="5px" mt="25px">Bank account ID</Typography>
                <CustomTextField id="bank_ac_id" variant="outlined" fullWidth required
                    inputProps={{
                        pattern: "\\d{9,12}",
                        title: "Bank account ID must be between 9 and 12 digits"
                    }} />

                <FormControl variant="outlined" fullWidth sx={{ mt: "25px" }} required>
                    <InputLabel id="preferred-currency-label">Preferred Currency Code</InputLabel>
                    <Select
                        labelId="preferred-currency-label"
                        id="preferred_currency_code"
                        label="Preferred Currency Code"
                        defaultValue=""
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="USD">USD</MenuItem>
                        <MenuItem value="EUR">EUR</MenuItem>
                        <MenuItem value="JPY">JPY</MenuItem>
                        <MenuItem value="GBP">GBP</MenuItem>
                        <MenuItem value="AUD">AUD</MenuItem>
                        <MenuItem value="CAD">CAD</MenuItem>
                        <MenuItem value="CHF">CHF</MenuItem>
                        <MenuItem value="CNY">CNY</MenuItem>
                        <MenuItem value="INR">INR</MenuItem>
                        {/* Add more currencies as needed */}
                    </Select>
                </FormControl>

            </Stack>
            <Button color="primary" variant="contained" size="large" fullWidth component={Link} href="/authentication/login">
                Sign Up
            </Button>
        </Box>
        {subtitle}
    </>
);

export default AuthRegister;
