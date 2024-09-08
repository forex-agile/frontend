import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Dashboard from '../../page';
import DashboardCard from '../../components/shared/DashboardCard';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { get } from 'lodash';
import { Button } from '@mui/material';
import { useCurrencyContext } from '../../components/currency/CurrencyProvider';





const AssestHolding = () => {

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
        // {
        //     field: 'Value',
        //     headerName: 'Market Value',
        //     type: 'number',
        //     width: 150,
        // },
        // {
        //     field: 'Change',
        //     headerName: 'Change',
        //     type: 'number',
        //     width: 110,
        //     renderCell: (params) => {
        //         const value = params.value as number;
        //         const arrowIcon = value >= 0 ? <ArrowUpwardIcon style={{ color: 'green' }} /> : <ArrowDownwardIcon style={{ color: 'red' }} />;
        //         return (
        //             <div style={{}}>
        //                 <span style={{ color: value >= 0 ? 'green' : 'red', fontWeight: 'bold', marginRight: "5px" }}>{value}%</span>
        //                 <span>{arrowIcon}</span>
        //             </div>
        //         );
        //     }
        // },
    ];

    // Rows Data Setup, the format is { id, currency, amount, value, change }
    const [rows, setRows] = React.useState([]);
    const [rerender, setRerender] = React.useState(false);
    const { currency, setCurrency } = useCurrencyContext();

    interface Asset {
        id: string;
        currency: string;
        amount: number;
    }

    // Fetch the rows data row by row from the mock API
    const fetchData = async () => {
        const response = await fetch('/api/assets');
        const data = await response.json();
        console.log("Current rows:", data);
        const formattedData = data.map((item: Asset) => ({
            id: item.id,
            CURRENCY: item.currency,
            AMOUNT: item.amount,
        }));

        setRows(formattedData);
        setRerender(!rerender);

    };


    React.useEffect(() => {
        // Call the mock API to get user's asset holdings
        fetchData();
    }, []);

    // Render the DataGrid once the rows are fetched

    return (

        <DashboardCard title={`Asset Holding in [  ${currency} ]`}>
            <>
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
            </>
        </DashboardCard>
    );
}

export default AssestHolding;