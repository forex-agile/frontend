
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

const PortfolioCard = () => {
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
  const [portfolioBalance, setPortfolioBalance] = React.useState(16888);
  const { currency, setCurrency } = useCurrencyContext();


  //

  // Submit deposite form data to backend by api
  const handleDepositeFormSubmit = () => {

  }

  // Submit transfer form data to backend by api
  const handleTransferFormSubmit = () => {

  }

  // Update the portfolio card with the latest data,
  useEffect(() => {

  });


  // chart
  const optionscolumnchart: any = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, primarylight, '#F9F9FD'],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };
  {/* TODO: Tune the chart based on ratio for each currency */ }
  const seriescolumnchart: any = [38, 40, 25];

  return (
    <DashboardCard>
      <Grid container direction={"row"} justifyContent={"flex-start"} alignItems={"flex-start"} spacing={3}>
        {/* column */}
        <Grid item xs={12} lg={12}>

          <Stack direction="row" spacing={2}>
            <Typography variant="h6" fontWeight="600">
              Portfolio Balance
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

          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Box>
              <Typography variant="h4" fontWeight="700" justifyItems={"center"}>
                ${portfolioBalance} {currency} {/* TODO: Call api to get the balance and currency type */}
              </Typography>
            </Box>
          </Stack>

          <Grid container
            direction={"row"}
            justifyContent={"flex-end"}
            alignItems={"flex-end"}
            xs={12} lg={12} spacing={1} mt={2}>

            {/* Deposite Button & Deposite Form */}
            <Grid item >

              <Button variant="outlined" color="primary" onClick={handleDepositFormClickOpen}>
                Deposit
              </Button>
              <Dialog
                open={DepositeFormOpen}
                onClose={handleDepositeFormClose}
                PaperProps={{
                  component: 'form',
                  onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    // const formData = new FormData(event.currentTarget);
                    // const formJson = Object.fromEntries((formData as any).entries());
                    // const email = formJson.email;
                    // console.log(email);
                    handleDepositeFormClose();
                  },
                }}>
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
            </Grid>

            {/* Transfer Button & Transfer Form */}
            <Grid item >
              <Button variant="outlined" color="primary" onClick={handleTransferFormClickOpen}>
                Transfer
              </Button>
              <Dialog
                open={TransferFormOpen}
                onClose={handleTransferFormClose}
                PaperProps={{
                  component: 'form',
                  onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    // const formData = new FormData(event.currentTarget);
                    // const formJson = Object.fromEntries((formData as any).entries());
                    // const email = formJson.email;
                    // console.log(email);
                    handleTransferFormClose();
                  },
                }}>
                {/* TODO: Add validation:
                          - Check if the currency is valid
                          - Check if the portfolio has enough money to transfer
                */}
                <DialogTitle>Transfer Form</DialogTitle>
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
                  <Button type="submit">Transfer</Button>
                  <Button onClick={handleTransferFormClose}>Cancel</Button>
                </DialogActions>

              </Dialog>

            </Grid>
          </Grid>
          <Grid item xs={5} sm={5}>
            <Chart
              options={optionscolumnchart}
              series={seriescolumnchart}
              type="donut"
              height={200} width={"100%"}
            />
          </Grid>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default PortfolioCard;
