import React, { useEffect, useState } from 'react';
import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, Chip } from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';

// Define sample data to be displayed on error
const sampleOrders = [
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
    }
];

const ForwardOrderTable: React.FC<{ portfolioId: string }> = ({ portfolioId }) => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`/api/v1/orders/outstanding?portfolioId=${portfolioId}&orderStatus=active`);
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                setError(error.message);
                // Use sample data if there's an error
                setOrders(sampleOrders);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [portfolioId]);

    if (loading) return <Typography>Loading...</Typography>;

    return (
        <DashboardCard title="Outstanding Orders">
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table aria-label="simple table" sx={{ whiteSpace: "nowrap", mt: 2 }}>
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
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Type
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Base Currency
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Quote Currency
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Total Volume
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Residual Volume
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Creation Date
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Expiry Date
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>
                                    <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
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
                                        {order.fk_base_currency_code}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        {order.fk_quote_currency_code}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">{order.total.toFixed(2)}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">{order.residual.toFixed(2)}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        {order.creation_date}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        {order.expiry_date}
                                    </Typography>
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
const getStatusColor = (status: string) => {
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
