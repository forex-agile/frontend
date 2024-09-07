'use client';
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

// components
import SalesOverview from '@/app/(DashboardLayout)/components/dashboard/SalesOverview';
import PortfolioCard from '@/app/(DashboardLayout)/components/dashboard/PortfolioCard';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import AssestHolding from './assestHolding';

const MyPortfolio = () => {
  return (
    <PageContainer title="My Portfolio" description="This is My Portfolio">
      <DashboardCard title="">
        <Box>
          <Grid container spacing={2}>
            <Grid container item spacing={2} lg={8}>
              <Grid item xs={6} lg={12}>
                <PortfolioCard />
              </Grid>
              <Grid item xs={6} lg={12}>
                <AssestHolding />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </DashboardCard>
    </PageContainer>
  )
}

export default MyPortfolio;