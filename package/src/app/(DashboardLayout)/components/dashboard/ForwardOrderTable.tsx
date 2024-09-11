import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip
} from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';

// Example order data
const orders = [
    {
        id: "1",
        order_side: "buy",
        order_status: "active",
        order_type: "market",
        creation_date: "2024-09-06",
        expiry_date: "2024-09-10",
        fk_base_currency_code: "USD",
        fk_quote_currency_code: "EUR",
        total: 10000,
        residual: 2500,
        limit: 1.15,
    },
    {
        id: "2",
        order_side: "sell",
        order_status: "cancelled",
        order_type: "limit",
        creation_date: "2024-08-20",
        expiry_date: "2024-09-05",
        fk_base_currency_code: "GBP",
        fk_quote_currency_code: "USD",
        total: 5000,
        residual: 0,
        limit: 1.35,
    },
    {
        id: "3",
        order_side: "buy",
        order_status: "cleared",
        order_type: "forward",
        creation_date: "2024-08-15",
        expiry_date: "2024-12-15",
        fk_base_currency_code: "JPY",
        fk_quote_currency_code: "USD",
        total: 7500,
        residual: 1000,
        limit: 110.25,
    }
];

const ForwardOrderTable = () => {
    return (
        <DashboardCard title="Forward Order Table">
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>


                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Order ID
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Side
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Status
                                    Status
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Type
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Currency Pair
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Total Volume
                                    Total Volume
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Residual Volume
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {order.id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        {order.order_side.charAt(0).toUpperCase() + order.order_side.slice(1)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        sx={{
                                            px: "4px",
                                            backgroundColor: getStatusColor(order.order_status),
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label={order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        {order.order_type.charAt(0).toUpperCase() + order.order_type.slice(1)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        {order.fk_base_currency_code}/{order.fk_quote_currency_code}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">{order.total.toFixed(2)}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">{order.residual.toFixed(2)}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
    );
};

// Helper function to get status color
const getStatusColor = (status) => {
    switch (status) {
        case 'active':
            return 'primary.main';
        case 'cancelled':
            return 'error.main';
        case 'cleared':
            return 'success.main';
        case 'closed':
            return 'secondary.main';
        case 'expired':
            return 'warning.main';
        default:
            return 'default';
    }
};

export default ForwardOrderTable;

