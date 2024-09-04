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

const Dashboard = () => {
  return (
    <PageContainer title="HomePage" description="This is a homepage">
      <Box>
        <Grid container spacing={2}>
          <Grid container item spacing={2} lg={8}>
            <Grid item xs={6} lg={12}>
              <FxRatesTable />
            </Grid>
            <Grid item xs={6} lg={12}>
              <ForwardOrderTable />
            </Grid>
          </Grid>

          <Grid container item spacing={2} lg={4}>
            <Grid  item xs={12} lg={12}>
              <PortfolioCard />
            </Grid>
            <Grid item xs={"auto"} lg={12}>
              <CreateOrderCard />
            </Grid>
            <Grid item xs={"auto"} lg={12}>
              <CreateOrderCard />
            </Grid>
          </Grid>
         

        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
