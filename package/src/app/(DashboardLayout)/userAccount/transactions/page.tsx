"use client";
import { Grid, Box } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";

// components
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import RecentTransactions from "../../components/dashboard/RecentTransactions";

const MyPortfolio = () => {
  return (
    <PageContainer title="My Portfolio" description="This is My Portfolio">
      <DashboardCard title="">
        <Box>
          <Grid container spacing={2}>
            <Grid container item spacing={2} lg={12}>
              <RecentTransactions />
            </Grid>
          </Grid>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default MyPortfolio;
