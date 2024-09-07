import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Dashboard from '../../page';
import DashboardCard from '../../components/shared/DashboardCard';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// Columns Setup
const columns: GridColDef<(typeof rows)[number]>[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 90
    },
    {
        field: 'CURRENCY',
        headerName: 'Currency',
        width: 150,
    },
    {
        field: 'AMOUNT',
        headerName: 'Amount',
        type: 'number',
        width: 150,
    },
    {
        field: 'Value',
        headerName: 'Market Value',
        type: 'number',
        width: 150,
    },
    {
        field: 'Change',
        headerName: 'Change',
        type: 'number',
        width: 110,
        renderCell: (params) => {
            const value = params.value as number;
            const arrowIcon = value >= 0 ? <ArrowUpwardIcon style={{ color: 'green' }} /> : <ArrowDownwardIcon style={{ color: 'red' }} />;
            return (
                <div style={{}}>
                    <span style={{ color: value >= 0 ? 'green' : 'red', fontWeight: 'bold', marginRight: "5px" }}>{value}%</span>
                    <span>{arrowIcon}</span>
                </div>
            );
        }
    },
];

// Rows Data Setup
const rows = [
    { id: 1, CURRENCY: 'USD', AMOUNT: 1000, Value: 10000, Change: 5 },
    { id: 2, CURRENCY: 'EUR', AMOUNT: 500, Value: 7500, Change: -2 },
    { id: 3, CURRENCY: 'GBP', AMOUNT: 800, Value: 12000, Change: 10 },
    { id: 4, CURRENCY: 'JPY', AMOUNT: 2000, Value: 5000, Change: -1 },
    { id: 5, CURRENCY: 'CAD', AMOUNT: 1500, Value: 9000, Change: 3 },
    { id: 6, CURRENCY: 'AUD', AMOUNT: 1200, Value: 6000, Change: -4 },
    { id: 7, CURRENCY: 'CHF', AMOUNT: 1000, Value: 8000, Change: 2 },
    { id: 8, CURRENCY: 'SGD', AMOUNT: 2000, Value: 10000, Change: -3 },
    { id: 9, CURRENCY: 'HKD', AMOUNT: 1800, Value: 7000, Change: 1 },
];

const AssestHolding = () => {
    return (
        <DashboardCard title="Assest Holding">
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
        </DashboardCard>
    );
}

export default AssestHolding;