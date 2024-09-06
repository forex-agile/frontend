'use client';
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

// components
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import MakeOrderForm from './makeOrderForm';
import ForexTable from './forexTable';

const MyPortfolio = () => {
    return (
        <PageContainer title="Create Order" description="User is creating order">
            <DashboardCard title="">
                <Box>
                    <Grid container spacing={2}>
                        <Grid item spacing={2} lg={2}>
                            {/* order book, display Bid, Sell */}
                        </Grid>

                        <Grid item spacing={2} lg={8}>
                            <ForexTable />
                            <MakeOrderForm />
                        </Grid>

                        <Grid item spacing={2} lg={2}>
                            {/* order book */}
                        </Grid>

                    </Grid>
                </Box>
            </DashboardCard>
        </PageContainer>
    )
}

export default MyPortfolio;