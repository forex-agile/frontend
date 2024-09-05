
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar, Button } from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons-react';

import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const PortfolioCard = () => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = '#ecf2ff';
  const successlight = theme.palette.success.light;

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

  {/* TODO: Tune the chart based on ratio for each currency */}
  const seriescolumnchart: any = [38, 40, 25];

  return (
    <DashboardCard title="My Portfolio $">
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={12} lg={8}>
          <Typography variant="h4" fontWeight="700">
            $36,358 (HKD) {/* TODO: Call api to get the balance and currency type */}
          </Typography>

          
          {/* <Stack spacing={3} mt={5} direction="row">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primary, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                USD
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primarylight, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                HKD
              </Typography>
            </Stack>
          </Stack> */}

        </Grid>
        <Grid container xs={12} lg={4} >
          
              <Grid item xs={6} lg={12}>
                {/* TODO: Trigger deposit function */}
                <Button variant="contained" color="primary" >
                  Deposit
                </Button>
              </Grid>
              <Grid item xs={6} lg={12}>
                <Button variant="contained" color="primary" >
                  Transfer 
                </Button>
              </Grid>
        </Grid>
        
        {/* column */}
        {/* <Grid item xs={5} sm={5}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            height={200} width={"100%"}
          />
        </Grid> */}
      </Grid>
    </DashboardCard>
  );
};

export default PortfolioCard;
