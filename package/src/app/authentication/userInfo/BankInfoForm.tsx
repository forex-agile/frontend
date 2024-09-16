import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Typography, TextField } from '@mui/material';

interface BankInfoFormProps {
    bankId: string;
    setBankId: React.Dispatch<React.SetStateAction<string>>;
    preferredCurrency: string;
    setPreferredCurrency: React.Dispatch<React.SetStateAction<string>>;
    bankIdError: string | null;
    setBankIdError: React.Dispatch<React.SetStateAction<string | null>>;
}

const BankInfoForm = ({
    bankId,
    setBankId,
    preferredCurrency,
    setPreferredCurrency,
    bankIdError,
    setBankIdError
}: BankInfoFormProps) => {
    const handleBankIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
        if (value.length > 12) {
            value = value.slice(0, 12); // Limit to 12 digits
        }
        const formattedValue = value.replace(/(\d{3})(?=\d)/g, '$1-'); // Add hyphen after every 3 digits
        setBankId(formattedValue);
        
        // Validate Bank ID
        if (formattedValue.length < 9) {
            setBankIdError("Bank Account ID must be between 9 and 12 digits.");
        } else {
            setBankIdError(null);
        }
    };

    return (
        <>
            <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor='bank_ac_id' mb="5px" mt="25px">
                Bank Account ID
            </Typography>
            <TextField
                id="bank_ac_id"
                variant="outlined"
                fullWidth
                value={bankId}
                onChange={handleBankIdChange}
                placeholder="123-456-789-012"
                inputProps={{ maxLength: 15 }} // Adjusted for max length with hyphens
                required
                error={!!bankIdError} // Shows red border if error exists
                helperText={bankIdError} // Displays error message below input
            />

            <FormControl variant="outlined" fullWidth sx={{ mt: "25px" }} required>
                <InputLabel id="preferred-currency-label">Preferred Currency Code</InputLabel>
                <Select
                    labelId="preferred-currency-label"
                    id="preferred_currency_code"
                    label="Preferred Currency Code"
                    value={preferredCurrency}
                    onChange={(e) => setPreferredCurrency(e.target.value as string)}
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
                </Select>
            </FormControl>
        </>
    );
};

export default BankInfoForm;
