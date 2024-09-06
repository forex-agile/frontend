import React, { useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { Typography, Box, Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, TextField, Button, Grid } from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CreateForwardOrderCard: React.FC = () => {
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

    //
    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));


    return (
        <DashboardCard title='Create Forward Order'>
            <>
                <Box mt={2}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>From Currency</TableCell>
                                <TableCell>To Currency</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Expiry Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Select value={fromCurrency} onChange={handleFromCurrencyChange}>
                                        <TextField value={fromCurrency} />
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
                                <TableCell>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        {/* <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                                            <DateTimePicker
                                                label="Uncontrolled picker"
                                                defaultValue={dayjs('2022-04-17T15:30')}
                                            />
                                            <DateTimePicker
                                                label="Controlled picker"
                                                value={value}
                                                onChange={(newValue) => setValue(newValue)}
                                            />
                                        </DemoContainer> */}
                                    </LocalizationProvider>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>



                </Box>
                <Grid container direction={"row"} justifyContent={"right"} spacing={2} mt={2}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Grid>
            </>
        </DashboardCard>
    );
}

export default CreateForwardOrderCard;