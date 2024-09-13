import React, { useEffect, useState } from 'react';

import {
    Box,
    Button,

} from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import RefreshIcon from '@mui/icons-material/Refresh';
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
        {
            field: 'INVERSE_RATE',
            headerName: 'INVERSE_RATE',
            type: 'number',
            width: 150,
        }
    ];


    // API related variables
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const user = localStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;
    const portfolioId = parsedUser && parsedUser.portfolioId ? parsedUser.portfolioId : null;



    const fetchData = async () => {

        console.log("Calling API for FxRatesTable from domain: ", baseURL);
        console.log("User:", user);
        console.log("Portfolio ID:", portfolioId);

        const response = await fetch(`${baseURL}/api/v1/fx-rate`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        });

        const data = await response.json();
        console.log("Current rows:", data);

        const formattedData = data.map((item: any, index: number) => ({
            id: index + 1,
            CURRENCY: item.currency.currencyCode,
            FX_RATE: item.rateToUSD,
            INVERSE_RATE: 1 / item.rateToUSD, // Add a new column for inverse rate
        }));

        console.log("Formatted data:", formattedData);

        localStorage.setItem('fxRates', JSON.stringify(formattedData));

        setRows(formattedData);


    };

    useEffect(() => {
        fetchData();
    }, [currency]);

    return (
        <DashboardCard title={`Fx Rates Table [  ${currency} ]`}>
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Box >
                    <Box sx={{ marginBottom: '5px' }}>
                        <Button onClick={fetchData}>
                            <RefreshIcon sx={{ marginRight: '3px' }} />Refresh
                        </Button>

                    </Box>
                </Box>
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
                        disableColumnFilter
                        disableColumnSelector
                        disableDensitySelector
                        slots={{ toolbar: GridToolbar }}
                        slotProps={{
                            toolbar: {
                                showQuickFilter: true,
                                // sx: {
                                //     border: '1px solid',
                                //     padding: '10px',
                                //     borderRadius: '5px',
                                //     // Add more styles as needed
                                // },
                            },
                        }}
                    />
                </Box>
            </Box>
        </DashboardCard >

    );
};

export default FxRatesTable;