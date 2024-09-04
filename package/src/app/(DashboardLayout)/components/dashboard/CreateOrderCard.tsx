import React, { useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { Typography, Box, Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, TextField, Button } from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const CreateOrderCard: React.FC = () => {
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [amount, setAmount] = useState('');

    const handleFromCurrencyChange = (event: SelectChangeEvent<string>) => {
        setFromCurrency(event.target.value);
    };

    const handleToCurrencyChange = (event: SelectChangeEvent<string>) => {
        setToCurrency(event.target.value);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
    };

    const handleSubmit = () => {
        // Handle submit logic here
    };

    return (
        <DashboardCard title='Create Trade Order'>
            <>
                <Box mt={2}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>From Currency</TableCell>
                                <TableCell>To Currency</TableCell>
                                <TableCell>Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    
                                    <Select value={fromCurrency} onChange={handleFromCurrencyChange}>
                                        <TextField value={fromCurrency}/>
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        <MenuItem value="USD">USD</MenuItem>
                                        <MenuItem value="EUR">EUR</MenuItem>
                                        {/* Add more options as needed */}
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Select value={toCurrency} onChange={handleToCurrencyChange}>
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        <MenuItem value="USD">USD</MenuItem>
                                        <MenuItem value="EUR">EUR</MenuItem>
                                        {/* Add more options as needed */}
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <TextField value={amount} onChange={handleAmountChange} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

          

                </Box>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </Button>

            </>
        </DashboardCard>
    );
}

export default CreateOrderCard;