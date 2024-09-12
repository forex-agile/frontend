import React, { useEffect, useState } from 'react';

import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Button
} from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useCurrencyContext } from '../currency/CurrencyProvider';

const FxRatesTable: React.FC = () => {

    const [rows, setRows] = useState([]);
    const { currency, setCurrency } = useCurrencyContext();

    interface FxRate {
        id: string;
        currency: string;
        rate: number;
    }

    const columns: GridColDef<(typeof rows)[number]>[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 90
        },
        {
            field: 'CURRENCY',
            headerName: 'Currency',
            width: 100,
        },
        {
            field: 'FX_RATE',
            headerName: 'FX_RATE',
            type: 'number',
            width: 150,
        },
        // {
        //     field: 'INVERSE_RATE',
        //     headerName: 'INVERSE_RATE',
        //     type: 'number',
        //     width: 150,
        // }
    ];

    // API variable
    const apiDomain = 'http://localhost:8080';


    const fetchData = async () => {
        const response = await fetch('/api/v1/fx-rate');
        const data = await response.json();
        console.log("Current rows:", data);
        const formattedData = data.map((item: any, index: number) => ({
            id: index + 1,
            CURRENCY: item.currency.currencyCode,
            FX_RATE: item.rateToUSD,
        }));

        setRows(formattedData);


    };

    useEffect(() => {
        fetchData();
    }, [currency]);

    return (
        <DashboardCard title={`Fx Rates Table [  ${currency} ]`}>
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Button onClick={fetchData}>
                    Refresh
                </Button>
                <Box sx={{ height: 380, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 100,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        disableRowSelectionOnClick
                    />
                </Box>
            </Box>
        </DashboardCard >

    );
};

export default FxRatesTable;