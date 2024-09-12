
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar, Button, TextField, Box, } from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons-react';

// Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Context
import { useCurrencyContext } from "../currency/CurrencyProvider";

// Components
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import React, { use, useEffect } from "react";
import { ST } from "next/dist/shared/lib/utils";
import { get, set } from "lodash";
import { PieChart } from '@mui/x-charts/PieChart';
import { relative } from "path";

const PortfolioCard = (props: { PortfolioBalance?: number }) => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = '#ecf2ff';
  const successlight = theme.palette.success.light;

  // dialog control
  const [DepositeFormOpen, setDepositeFormOpen] = React.useState(false);
  const [TransferFormOpen, setTransferFormOpen] = React.useState(false);

  const handleDepositFormClickOpen = () => { setDepositeFormOpen(true) };
  const handleDepositeFormClose = () => { setDepositeFormOpen(false) };
  const handleTransferFormClickOpen = () => { setTransferFormOpen(true) };
  const handleTransferFormClose = () => { setTransferFormOpen(false) };

  // Variables
  const [portfolioData, setPortfolioData] = React.useState({});
  const [portfolioBalance, setPortfolioBalance] = React.useState(props.PortfolioBalance);
  const { currency, setCurrency } = useCurrencyContext();
  const [rerender, setRerender] = React.useState(false);
  const [chartData, setChartData] = React.useState([]);

  // API related variables
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const user = localStorage.getItem('user');
  const parsedUser = user ? JSON.parse(user) : null;
  const portfolioId = parsedUser && parsedUser.portfolioId ? parsedUser.portfolioId : null;
  const userId = get(JSON.parse(user || '{}'), 'id');

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

  // Portfolio balance
  // Fetch the user's asset holdings
  const fetchData = async () => {


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



    // Calculate the Portfolio Balance
    const portfolioBalance = formattedData.reduce((acc: number, item: any) => acc + item.marketValue, 0);
    setPortfolioBalance(portfolioBalance);

    // Set the chart data
    const chartData = formattedData.map((item: any) => ({
      label: item.CURRENCY,
      value: item.marketValue,
    }));

    setChartData(chartData);


  };

  // Helper function:  get the current fx rate based on the chosen currency
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


  // Submit deposite form data to backend by api
  const handleDepositeFormSubmit = (currency: string, value: number) => {

    // Get the portfolio ID from the user object
    console.log("Calling API for fund-transfer [Deposit] from domain: ", baseURL);
    console.log("User:", user);
    console.log("Portfolio ID:", portfolioId);

    fetch(`${baseURL}/api/v1/fund-transfer`, {
      method: 'POST',
      body: JSON.stringify({
        currency: {
          currencyCode: currency // pass the currency code
        },
        amount: value,   // pass the amount
        transferType: "DEPOSIT",
        portfolio: {
          id: portfolioId
        }
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => response.json())
      .then(data => {
        // Trigger the re-render
        setRerender(!rerender);
      })
      .catch(error => {
        // Handle any errors that occur during the API call
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  // Submit withdraw form data to backend by api
  const handleTransferFormSubmit = (currency: string, value: number) => {

    console.log("Calling API for fund-transfer [Withdrawal] from domain: ", baseURL);
    console.log("User:", user);
    console.log("Portfolio ID:", portfolioId);

    fetch(`${baseURL}/api/v1/fund-transfer`, {
      method: 'POST',
      body: JSON.stringify({
        currency: {
          currencyCode: currency // pass the currency code
        },
        amount: value,   // pass the amount
        transferType: "WITHDRAWAL",
        portfolio: {
          id: portfolioId
        }
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => response.json())
      .then(data => {
        // Trigger the re-render
        setRerender(!rerender);
      })
      .catch(error => {
        // Handle any errors that occur during the API call
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  // Update the portfolio card with the latest balance calculated from the asset holdings
  useEffect(() => {
    setPortfolioBalance(props.PortfolioBalance);
    fetchData();
  }, [props.PortfolioBalance, currency, rerender]);



  // chart
  // const optionscolumnchart: any = {
  //   chart: {
  //     type: 'donut',
  //     fontFamily: "'Plus Jakarta Sans', sans-serif;",
  //     foreColor: '#adb0bb',
  //     toolbar: {
  //       show: false,
  //     },
  //     height: 205,
  //   },
  //   colors: [primary, primarylight, '#F9F9FD'],
  //   plotOptions: {
  //     pie: {
  //       startAngle: 0,
  //       endAngle: 360,
  //       donut: {
  //         size: '100%',
  //         background: 'transparent',
  //       },
  //     },
  //   },
  //   tooltip: {
  //     theme: theme.palette.mode === 'dark',
  //     fillSeriesColor: true,
  //   },
  //   stroke: {
  //     show: false,
  //   },
  //   dataLabels: {
  //     enabled: true,
  //   },
  //   legend: {
  //     show: true,
  //     position: 'left',
  //   },
  //   responsive: [
  //     {
  //       breakpoint: 991,
  //       options: {
  //         chart: {
  //           width: 150,
  //         },
  //       },
  //     },
  //   ],
  // };

  // const seriescolumnchart: any = amountRatio;






  return (
    <DashboardCard>
      <>
        <Stack direction="row" spacing={2}>
          <Typography variant="h6" fontWeight="600">
            My Portfolio
          </Typography>
          <Avatar
            sx={{
              backgroundColor: successlight,
              color: primary,
              width: 30,
              height: 30,
              position: 'relative',
              bottom: 10,
            }}

          >
            <IconArrowUpLeft />
          </Avatar>
        </Stack>

        <Grid container direction={"row"} justifyContent={"flex-start"} alignItems={"flex-start"} spacing={3}>
          {/* column */}
          <Grid item xs={12} lg={6}>

            <Typography variant="h4" fontWeight="700" justifyItems={"center"}>
              ${portfolioBalance?.toFixed(3) ?? 0}  ({currency})
            </Typography>
          </Grid>

          <Grid item direction={"row"} spacing={2} xs={12} lg={6}>

            {/* Deposite Button & Deposite Form */}


            <Button variant="outlined" color="primary" onClick={handleDepositFormClickOpen} sx={{ marginRight: 2 }}>
              Deposit
            </Button>
            <Dialog
              open={DepositeFormOpen}
              onClose={handleDepositeFormClose}
              PaperProps={{
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  const formJson = Object.fromEntries((formData as any).entries());
                  const currency = formJson.Currency;
                  const value = formJson.Value;
                  handleDepositeFormSubmit(currency, value);
                  handleDepositeFormClose();
                },
              }}
            >
              <DialogTitle>Deposit Form</DialogTitle>
              <DialogContent>
                <DialogContentText mt={3}>
                  Enter the following details to deposit money into your account.
                </DialogContentText>
                <Grid container spacing={2}>
                  <Grid item xs={6} lg={6}>
                    <TextField label="Currency"
                      autoFocus
                      required
                      margin="dense"
                      id="name"
                      name="Currency"
                      type="text"
                      fullWidth
                      variant="standard" />

                  </Grid>
                  <Grid item xs={6} lg={6}>
                    <TextField label="Value"
                      autoFocus
                      required
                      margin="dense"
                      id="name"
                      name="Value"
                      type="number"
                      fullWidth
                      variant="standard" />

                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button type="submit">Deposit </Button>
                <Button onClick={handleDepositeFormClose}>Cancel</Button>
              </DialogActions>
            </Dialog>



            {/* Transfer Button & Transfer Form */}

            <Button variant="outlined" color="primary" onClick={handleTransferFormClickOpen}>
              Withdraw
            </Button>
            <Dialog
              open={TransferFormOpen}
              onClose={handleTransferFormClose}
              PaperProps={{
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  const formJson = Object.fromEntries((formData as any).entries());
                  const currency = formJson.Currency;
                  const value = formJson.Value;
                  handleTransferFormSubmit(currency, value);
                  handleTransferFormClose();
                },
              }}>
              {/* TODO: Add validation:
                          - Check if the currency is valid
                          - Check if the portfolio has enough money to transfer
                */}
              <DialogTitle>Withdraw Form</DialogTitle>
              <DialogContent>
                <DialogContentText mt={3}>
                  Enter the following details to transfer money out from your account.
                </DialogContentText>
                <Grid container spacing={2}>
                  <Grid item xs={6} lg={6}>
                    <TextField label="Currency"
                      autoFocus
                      required
                      margin="dense"
                      id="name"
                      name="Currency"
                      type="text"
                      fullWidth
                      variant="standard" />

                  </Grid>
                  <Grid item xs={6} lg={6}>
                    <TextField label="Value"
                      autoFocus
                      required
                      margin="dense"
                      id="name"
                      name="Value"
                      type="number"
                      fullWidth
                      variant="standard" />

                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button type="submit">Withdraw</Button>
                <Button onClick={handleTransferFormClose}>Cancel</Button>
              </DialogActions>

            </Dialog>
          </Grid>
          <Grid item direction={"column"} lg={12} xs={12} sm={5} mt={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6" color="textSecondary" sx={{ position: "relative", right: 50, bottom: 10 }}>
              Currency Distribution In Market Value
            </Typography>
            <PieChart
              series={[
                {
                  data: chartData,
                  highlightScope: { fade: 'global', highlight: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },

                },
              ]}
              height={200}
              width={300}
            />
          </Grid>
        </Grid>
      </>
    </DashboardCard >
  );
};

export default PortfolioCard;
