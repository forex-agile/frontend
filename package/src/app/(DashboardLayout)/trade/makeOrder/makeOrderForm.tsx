import React, { useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { Typography, Box, Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, TextField, Button, Grid } from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { Widgets } from '@mui/icons-material';

const MakeOrderForm: React.FC = () => {
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [limitPrice, setLimitPrice] = useState('');

    const handleLimitPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLimitPrice(event.target.value);
    };

    const handleFromCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFromCurrency(event.target.value);
    };

    const handleToCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setToCurrency(event.target.value);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
    };

    const handleSubmit = () => {
        // Handle submit logic here
    };

    const [orderType, setOrderType] = useState<'market' | 'limit'>('market');

    const handleOrderTypeChange = (type: 'market' | 'limit') => {
        setOrderType(type);
    };

    const handleMarketOrderClick = () => {
        handleOrderTypeChange('market');
    };

    const handleLimitOrderClick = () => {
        handleOrderTypeChange('limit');
    };

    return (
        <DashboardCard title='Spot Order'>
            <>
                <Button variant="outlined" onClick={handleMarketOrderClick} style={{ backgroundColor: orderType === 'market' ? 'black' : 'white', color: orderType === 'market' ? 'white' : 'black' }}>
                    Market Order
                </Button>
                <Button variant="outlined" onClick={handleLimitOrderClick} style={{ backgroundColor: orderType === 'limit' ? 'black' : 'white', color: orderType === 'limit' ? 'white' : 'black' }}>
                    Limit Order
                </Button>

                <Grid container spacing={2} mt={2}>
                    {orderType === 'market' ? (
                        <>
                            <Grid item>
                                <Typography variant="subtitle1" sx={{ marginBottom: '1rem' }}>From Currency</Typography>
                                <TextField value={fromCurrency} onChange={handleFromCurrencyChange} fullWidth />
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" sx={{ marginBottom: '1rem' }}>To Currency</Typography>
                                <TextField value={toCurrency} onChange={handleToCurrencyChange} fullWidth />
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" sx={{ marginBottom: '1rem' }}>Amount</Typography>
                                <TextField
                                    label="Amount"
                                    autoFocus
                                    required
                                    id="name"
                                    name="Currency"
                                    type="number"
                                    value={amount}
                                    placeholder="Amount"
                                    onChange={handleAmountChange}
                                    fullWidth
                                />
                            </Grid>
                        </>
                    ) : (
                        <>
                            <Grid item>
                                <Typography variant="subtitle1" sx={{ marginBottom: '1rem' }}>From Currency</Typography>
                                <TextField value={fromCurrency} onChange={handleFromCurrencyChange} fullWidth />
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" sx={{ marginBottom: '1rem' }}>To Currency</Typography>
                                <TextField value={toCurrency} onChange={handleToCurrencyChange} fullWidth />
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" sx={{ marginBottom: '1rem' }}>Amount</Typography>
                                <TextField value={amount} onChange={handleAmountChange} fullWidth />
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" sx={{ marginBottom: '1rem' }}>Limit Price</Typography>
                                <TextField value={limitPrice} onChange={handleLimitPriceChange} fullWidth />
                            </Grid>
                        </>
                    )}
                </Grid>

                <Grid container justifyContent="flex-end" mt={2}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Grid>
            </>
        </DashboardCard>
    );
}

export default MakeOrderForm;