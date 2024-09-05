import React, { useEffect, useState } from 'react';

import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip
} from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';

const FxRatesTable: React.FC = () => {
    const [currencyPairs, setCurrencyPairs] = useState<string[]>([]);
    const [prices, setPrices] = useState<{ [pair: string]: number }>({});

    useEffect(() => {
        // Simulating real-time data updates
        const interval = setInterval(() => {
            // Fetch updated currency pairs and prices from an API
            const updatedPairs = ['EUR/USD', 'GBP/USD', 'USD/JPY'];
            const updatedPrices = {
                'EUR/USD': 1.18,
                'GBP/USD': 1.38,
                'USD/JPY': 110.25,
            };

            setCurrencyPairs(updatedPairs);
            setPrices(updatedPrices);
        }, 500);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <DashboardCard title="Fx Rates Table">
        <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
            <Table
                aria-label="simple table"
                sx={{
                    whiteSpace: "nowrap",
                    mt: 2
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Currency Pair
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Buy
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Sell
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currencyPairs.map((pair) => (
                        <TableRow key={pair}>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    {pair}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={prices[pair]}
                                    color="primary"
                                    variant="outlined"
                                />
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={prices[pair]}
                                    color="secondary"
                                    variant="outlined"
                                />
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    </DashboardCard>

    );
};

export default FxRatesTable;