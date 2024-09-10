import React, { useEffect, useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { Typography, Box, Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, TextField, Button, Grid, Stack, Autocomplete, Paper, PaperOwnProps, PaperProps } from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { Widgets } from '@mui/icons-material';

// Date Picker
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { CommonProps } from '@mui/material/OverridableComponent';

const MakeOrderForm: React.FC = () => {

    // Variables for both Market and Limit order form 
    const [orderType, setOrderType] = useState<'market' | 'limit'>('market'); // Default to Market order
    const [orderSide, setOrderSide] = useState<'buy' | 'sell'>('buy');        // Default to Buy order
    const [baseFxCurrencyCode, setBaseFxCurrencyCode] = useState('');
    const [quoteFxCurrencyCode, setQuoteFxCurrencyCode] = useState('');
    const [total, setTotal] = useState('');
    const [expirationDate, setExpirationDate] = useState<Dayjs | null>(dayjs());
    const [orderFxRate, setOrderFxRate] = useState('');                       //Only for display purposes, will not be sent to the backend

    // Variables for only Limit order form
    const [limit, setLimit] = useState('');


    // TODO: Fetch the fx rate and user assets from the backend
    // Fx Rate: An array of Currency code and rate (GET By API)
    const [fxRate, setFxRate] = useState<{ currencyCode: string; rate: number; }[]>([{ currencyCode: 'USD', rate: 1.0 }, { currencyCode: 'EUR', rate: 0.85 }, { currencyCode: 'GBP', rate: 0.75 }, { currencyCode: 'JPY', rate: 110.0 }]);

    // User Assets: An array of Currency code and amount (GET By API)
    const [userAssets, setUserAssets] = useState<{ currencyCode: string; amount: number; }[]>([{ currencyCode: 'USD', amount: 1000 }, { currencyCode: 'EUR', amount: 500 }, { currencyCode: 'GBP', amount: 300 }, { currencyCode: 'JPY', amount: 10000 }]);

    // Custom Paper component for the dropdown menu in currency selection
    const CurrencyDropDownMenu: React.FC<PaperProps> = (props) => (
        <Paper {...props} sx={{ maxHeight: 150 }} />
    );

    // Handlers for variables in both Market and Limit order form
    const handleBaseFxCurrencyCode = (event: React.ChangeEvent<{}>, value: string | null) => {
        setBaseFxCurrencyCode(value || '');
    };

    const handleQuoteFxCurrencyCode = (event: React.SyntheticEvent<Element, Event>, value: string | null) => {
        setQuoteFxCurrencyCode(value || '');
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


    // API Domain
    const apiDomain = 'http://localhost:8080';

    // TODO: Add authorization token in the header
    // Handler for submitting the Market form
    const handleMarketOrderSubmit = () => {
        fetch(`${apiDomain}/api/v1/order/spot`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Token should be stored in local storage when user logs in
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
        fetch(`${apiDomain}/api/v1/order/spot`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Token should be stored in local storage when user logs in
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

    // Handler for changing the FX rate
    const handleOrderFxRate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrderFxRate(event.target.value);
    };

    // Calculate the fx rate when the base and quote currency changes
    useEffect(() => {

        // Get base currency code Fx rate

        // Get quote currency code Fx rate

        // Calculate the fx rate, by dividing the base currency code Fx rate by the quote currency code Fx rate

        // Set the calculated fx rate to the orderFxRate state

    }, [baseFxCurrencyCode, quoteFxCurrencyCode]);

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
                                {/* <TextField
                                    label={orderSide === 'buy' ? 'Buy Currency' : 'Sell Currency'}
                                    value={baseFxCurrencyCode}
                                    onChange={handleBaseFxCurrencyCode}
                                    fullWidth placeholder='Quote Fx' /> */}
                                <Autocomplete
                                    disablePortal
                                    options={fxRate.map((option) => option.currencyCode)}
                                    sx={{ width: 150 }}
                                    value={baseFxCurrencyCode}
                                    onChange={handleBaseFxCurrencyCode}
                                    renderInput={(params) => <TextField {...params} label={orderSide === 'buy' ? 'Buy Currency' : 'Sell Currency'} />}
                                    PaperComponent={CurrencyDropDownMenu}
                                />
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
                                {/* <TextField
                                    label="Settlement Currency"
                                    value={quoteFxCurrencyCode}
                                    onChange={handleQuoteFxCurrencyCode}
                                    fullWidth placeholder="Base Fx" /> */}

                                <Autocomplete
                                    disablePortal
                                    options={fxRate.map((option) => option.currencyCode)}
                                    sx={{ width: 150 }}
                                    value={quoteFxCurrencyCode}
                                    onChange={handleQuoteFxCurrencyCode}
                                    renderInput={(params) => <TextField {...params} label="Settlement Currency" />}
                                />
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

                            <Grid item>
                                <TextField
                                    label="FX Rate"
                                    value={orderFxRate}
                                    type='number'
                                    onChange={handleOrderFxRate} fullWidth />
                            </Grid>
                        </>
                    ) : (
                        // Limit Order Form
                        <>
                            <Grid item>
                                {/* <TextField
                                    label={orderSide === 'buy' ? 'Buy Currency' : 'Sell Currency'}
                                    value={baseFxCurrencyCode}
                                    onChange={handleBaseFxCurrencyCode}
                                    fullWidth placeholder="Base Fx" /> */}
                                <Autocomplete
                                    disablePortal
                                    options={fxRate.map((option) => option.currencyCode)}
                                    sx={{ width: 150 }}
                                    value={baseFxCurrencyCode}
                                    onChange={handleBaseFxCurrencyCode}
                                    renderInput={(params) => <TextField {...params} label={orderSide === 'buy' ? 'Buy Currency' : 'Sell Currency'} />}
                                />
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
                                {/* <TextField
                                    label="Settlement Currency"
                                    value={quoteFxCurrencyCode}
                                    onChange={handleQuoteFxCurrencyCode}
                                    fullWidth placeholder="Quote Fx" /> */}
                                <Autocomplete
                                    disablePortal
                                    options={fxRate.map((option) => option.currencyCode)}
                                    sx={{ width: 150 }}
                                    value={quoteFxCurrencyCode}
                                    onChange={handleQuoteFxCurrencyCode}
                                    renderInput={(params) => <TextField {...params} label="Settlement Currency" />}
                                />
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
                                <TextField
                                    label="FX Rate"
                                    value={orderFxRate}
                                    type='number'
                                    onChange={handleOrderFxRate} fullWidth />
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