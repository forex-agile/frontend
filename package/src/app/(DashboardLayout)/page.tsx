'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// components
import SalesOverview from '@/app/(DashboardLayout)/components/dashboard/SalesOverview';
import PortfolioCard from '@/app/(DashboardLayout)/components/dashboard/PortfolioCard';
import RecentTransactions from '@/app/(DashboardLayout)/components/dashboard/RecentTransactions';
import ForwardOrderTable from '@/app/(DashboardLayout)/components/dashboard/ForwardOrderTable';
import Blog from '@/app/(DashboardLayout)/components/dashboard/Blog';
import MonthlyEarnings from '@/app/(DashboardLayout)/components/dashboard/MonthlyEarnings';
import FxRatesTable from './components/dashboard/FxRatesTable';
import CreateOrderCard from './components/dashboard/CreateOrderCard';
import CreateForwardOrderCard from './components/dashboard/CreateForwardOrderCard';

const Dashboard = () => {
  return (
    <PageContainer title="HomePage" description="This is a homepage">
      <Box margin={0}>
        <Grid container justifyContent={"flex-start"} alignItems={"flex-start"} spacing={2} sx={{ margin: '0px' }}>
          <Grid container item spacing={2}>
            <Grid item xs={6} lg={7}>
              <FxRatesTable />
            </Grid>
            <Grid item xs={6} sx={{ minHeight: "auto" }} lg={5}>
              <PortfolioCard />
            </Grid>
          </Grid>

          <Grid container item spacing={2}>
            <Grid item xs={12} lg={12}>
              <ForwardOrderTable />
            </Grid>
            <Grid item lg={12}>
              {/* <CreateOrderCard /> */}
            </Grid>
            <Grid item lg={12}>
              {/* <CreateForwardOrderCard /> */}
            </Grid>
          </Grid>


        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
