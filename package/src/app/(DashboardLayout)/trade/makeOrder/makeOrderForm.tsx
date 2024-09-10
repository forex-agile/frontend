import React, { useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { Typography, Box, Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, TextField, Button, Grid, Stack } from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { Widgets } from '@mui/icons-material';

// Date Picker
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const MakeOrderForm: React.FC = () => {

    // Variables for both Market and Limit order form 
    const [orderType, setOrderType] = useState<'market' | 'limit'>('market'); // Default to Market order
    const [orderSide, setOrderSide] = useState<'buy' | 'sell'>('buy');        // Default to Buy order
    const [baseFxCurrencyCode, setBaseFxCurrencyCode] = useState('');
    const [quoteFxCurrencyCode, setQuoteFxCurrencyCode] = useState('');
    const [total, setTotal] = useState('');
    const [expirationDate, setExpirationDate] = useState<Dayjs | null>(dayjs());


    // Variables for only Limit order form
    const [limit, setLimit] = useState('');

    // Handlers for both Market and Limit order form
    const handleBaseFxCurrencyCode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBaseFxCurrencyCode(event.target.value);
    };

    const handleQuoteFxCurrencyCode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuoteFxCurrencyCode(event.target.value);
    };

    const handleTotalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTotal(event.target.value);
    };

    const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLimit(event.target.value);
    };

    // const handleExpirationDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setExpirationDate(event.target.value);
    // };


    const apiDomain = 'http://localhost:8080';

    // TODO: Add authorization token in the header
    // Handler for submitting the Market form
    const handleMarketOrderSubmit = () => {
        fetch(`${apiDomain}/api/v1/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                baseFxCurrencyCode: baseFxCurrencyCode,
                quoteFxCurrencyCode: quoteFxCurrencyCode,
                total: total,
                orderType: orderType,
                orderSide: orderSide,
                expirationDate: expirationDate ? expirationDate.toISOString() : null //Convert current date to ISO 8601 format
            })

        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    // Handler for submitting the Limit form
    const handleLimitOrderSubmit = () => {
        fetch(`${apiDomain}/api/v1/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                baseFxCurrencyCode: baseFxCurrencyCode,
                quoteFxCurrencyCode: quoteFxCurrencyCode,
                total: total,
                limit: limit,
                orderType: orderType,
                orderSide: orderSide,
                expirationDate: expirationDate ? expirationDate.toISOString() : null //Convert current date to ISO 8601 format
            })

        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }



    // Handlers for changing the order type and side via Market & Limit buttons
    const handleOrderTypeChange = (type: 'market' | 'limit') => {
        setOrderType(type);
    };

    const handleMarketOrderClick = () => {
        handleOrderTypeChange('market');
    };

    const handleLimitOrderClick = () => {
        handleOrderTypeChange('limit');
    };

    // Handlers for changing the order side via Buy & Sell buttons
    const handleOrderSideChange = (side: 'buy' | 'sell') => {
        setOrderSide(side);
    };

    const handleBuyOrderClick = () => {
        handleOrderSideChange('buy');
    };

    const handleSellOrderClick = () => {
        handleOrderSideChange('sell');
    };

    return (
        <DashboardCard title='Spot Order'>
            <>
                <Grid>
                    <Button variant="outlined" onClick={handleMarketOrderClick} style={{ backgroundColor: orderType === 'market' ? 'black' : 'white', color: orderType === 'market' ? 'white' : 'black' }}>
                        Market
                    </Button>
                    <Button variant="outlined" onClick={handleLimitOrderClick} style={{ backgroundColor: orderType === 'limit' ? 'black' : 'white', color: orderType === 'limit' ? 'white' : 'black' }}>
                        Limit
                    </Button>
                </Grid>

                <Grid mt={1}>
                    <Button variant="outlined" onClick={handleBuyOrderClick} style={{ backgroundColor: orderSide === 'buy' ? 'black' : 'white', color: orderSide === 'buy' ? 'white' : 'black' }}>
                        Buy
                    </Button>
                    <Button variant="outlined" onClick={handleSellOrderClick} style={{ backgroundColor: orderSide === 'sell' ? 'black' : 'white', color: orderSide === 'sell' ? 'white' : 'black' }}>
                        Sell
                    </Button>
                </Grid>

                {/* TODO: Dropdown menu for currency */}
                <Grid container spacing={2} mt={2}>
                    {orderType === 'market' ? (

                        // Market Order Form
                        <>
                            <Grid item>
                                <TextField
                                    label={orderSide === 'buy' ? 'Buy Currency' : 'Sell Currency'}
                                    value={baseFxCurrencyCode}
                                    onChange={handleBaseFxCurrencyCode}
                                    fullWidth placeholder='Quote Fx' />
                            </Grid>

                            <Grid item>
                                <TextField
                                    label="Amount"
                                    autoFocus
                                    required
                                    id="name"
                                    name="Currency"
                                    type="number"
                                    value={total}
                                    placeholder="Total"
                                    onChange={handleTotalChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Settlement Currency"
                                    value={quoteFxCurrencyCode}
                                    onChange={handleQuoteFxCurrencyCode}
                                    fullWidth placeholder="Base Fx" />
                            </Grid>
                            <Grid item>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        label="Expiry Date"
                                        value={expirationDate}
                                        onChange={(newDate) => setExpirationDate(newDate)}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </>
                    ) : (
                        // Limit Order Form
                        <>
                            <Grid item>
                                <TextField
                                    label={orderSide === 'buy' ? 'Buy Currency' : 'Sell Currency'}
                                    value={baseFxCurrencyCode}
                                    onChange={handleBaseFxCurrencyCode}
                                    fullWidth placeholder="Base Fx" />
                            </Grid>

                            <Grid item>
                                <TextField
                                    label="Amount"
                                    value={total}
                                    type='number'
                                    onChange={handleTotalChange}
                                    fullWidth placeholder="Total" />
                            </Grid>

                            <Grid item>
                                <TextField
                                    label="Settlement Currency"
                                    value={quoteFxCurrencyCode}
                                    onChange={handleQuoteFxCurrencyCode}
                                    fullWidth placeholder="Quote Fx" />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label={orderSide === 'buy' ?
                                        <>
                                            <strong style={{ color: 'red' }}>Max </strong>
                                            Settlement
                                        </>
                                        :
                                        <strong style={{ color: 'red' }}>Min </strong>}
                                    value={limit}
                                    type='number'
                                    onChange={handleLimitChange}
                                    fullWidth placeholder="Limit" />
                            </Grid>


                            {/* TODO: DateTime picker */}
                            <Grid item>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        label="Expiry Date"
                                        value={expirationDate}
                                        onChange={(newDate) => setExpirationDate(newDate)}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            {/* TODO: FX rates */}
                            <Grid item>
                                {/* <TextField value={ } onChange={ } fullWidth /> */}
                            </Grid>



                        </>
                    )}
                </Grid>

                <Grid container justifyContent="flex-end" mt={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={orderType === 'market' ? handleMarketOrderSubmit : handleLimitOrderSubmit}
                    >
                        Submit
                    </Button>
                </Grid>
            </>
        </DashboardCard >
    );
}

export default MakeOrderForm;