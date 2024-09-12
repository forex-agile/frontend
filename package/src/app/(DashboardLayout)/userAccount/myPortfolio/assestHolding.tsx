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
import PortfolioCard from '../../components/dashboard/PortfolioCard';





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
            width: 100,
        },
        {
            field: 'AMOUNT',
            headerName: 'Amount',
            type: 'number',
            width: 150,
        },
        {
            field: 'marketValue',
            headerName: 'Market Value',
            type: 'number',
            width: 150,
        },
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

    // Asset Interface
    interface Asset {
        balance: any;
        id: string;
        currency: {
            currencyCode: string;
        };
        amount: number;
        marketValue: number;
    }

    // API related variables
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const user = localStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;
    const portfolioId = parsedUser && parsedUser.portfolioId ? parsedUser.portfolioId : null;
    const userId = get(JSON.parse(user || '{}'), 'id');

    // Fetch the user's asset holdings
    const fetchData = async () => {

        console.log("Fetching data for user:", userId);
        console.log("Portfolio ID:", portfolioId);
        console.log("Authorization Token:", 'Bearer ' + localStorage.getItem('token'));

        const response = await fetch(`${baseURL}/api/v1/portfolio/user/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        });
        const responseData = await response.text();
        const data = responseData ? JSON.parse(responseData) : [];
        console.log("Rows data:", data.assets);

        const fxRate = await getCurrentBasedFxRateTable(currency);

        const formattedData = data.assets.map((item: Asset, index: number) => ({
            id: index + 1,
            CURRENCY: item.currency.currencyCode,
            AMOUNT: item.balance,

            // Calculate the market value based on the new fx rate by mapping the currency to the new fx rate
            marketValue: item.balance * fxRate.find((rate: any) => rate.CURRENCY === item.currency.currencyCode).FX_RATE,
        }));

        // Set the rows data
        setRows(formattedData);
    };

    const getCurrentBasedFxRateTable = async (currency: string) => {


        // Get the Base Currency fx rate
        const response = await fetch(`${baseURL}/api/v1/fx-rate`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        });

        const data = await response.json();

        const formattedData = data.map((item: any, index: number) => ({
            id: index + 1,
            CURRENCY: item.currency.currencyCode,
            FX_RATE: item.rateToUSD,
        }));



        // Recalculate the fx rate based on the current chose currency, if the currency is not USD

        // Get the fx rate for the chosen currency

        const inversedNewBasefxRate = formattedData.find((item: any) => item.CURRENCY === currency).FX_RATE;

        console.log("Current fx rate for ", currency, "is:", inversedNewBasefxRate);

        // Mulitply the old base fx rate table (formattedData) by the inverse of the new base fx rate
        const newFxRateTable = formattedData.map((item: any) => ({
            ...item,
            FX_RATE: item.FX_RATE / inversedNewBasefxRate,
        }));



        return newFxRateTable;


    };




    // Fetch the data on load
    React.useEffect(() => {
        fetchData();
    }, [currency]);

    // Render the DataGrid once the rows are fetched
    return (
        <>

            {/* Pass the calculated balance to the portfolioCard */}
            <PortfolioCard PortfolioBalance={50} />

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
        </>
    );
}

export default AssestHolding;