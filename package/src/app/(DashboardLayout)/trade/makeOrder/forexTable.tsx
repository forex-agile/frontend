import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';

function ForexTable() {
    const forexData = [
        { currencyPair: 'EUR/USD', fxRate: 1.2050 },
        { currencyPair: 'USD/JPY', fxRate: 110.25 },
        { currencyPair: 'GBP/USD', fxRate: 1.3850 },
        { currencyPair: 'AUD/USD', fxRate: 0.7650 },
        { currencyPair: 'USD/CHF', fxRate: 0.9150 },
    ];

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Currency Pair</TableCell>
                        <TableCell align="right">FX Rate</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {forexData.map((row) => (
                        <TableRow key={row.currencyPair}>
                            <TableCell>{row.currencyPair}</TableCell>
                            <TableCell align="right">{row.fxRate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ForexTable;