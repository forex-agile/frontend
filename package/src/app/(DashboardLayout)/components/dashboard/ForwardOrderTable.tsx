import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';

const sampleOrders = [
    {
        id: "1",
        orderSide: "buy",
        orderStatus: "active",
        orderType: "market",
        creationDate: "2024-09-06T00:00:00Z",
        expiryDate: "2024-09-10T00:00:00Z",
        baseFx: "USD",
        quoteFx: "EUR",
        total: 10000,
        residual: 2500,
        limit: 1.15,
    },
];

const ForwardOrderTable: React.FC = () => {
    const [orders, setOrders] = useState<{ id: string; orderSide: string; orderStatus: string; orderType: string; creationDate: string; expiryDate: string; baseFx: string; quoteFx: string; total: number; residual: number; limit: number; }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState('');

    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const user = localStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;
    const portfolioId = parsedUser && parsedUser.portfolioId ? parsedUser.portfolioId : null;

    const [switchToUserBoard, setSwitchToUserBoard] = useState(false); // Default to false (Outstanding Order Board)

    useEffect(() => {

        // OPTION: Fetch all orders {status: ACTIVE}
        const fetchOrders = async () => {
            console.log("Fetching orders...");
            if (!portfolioId) {
                setError('Portfolio ID not found');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${baseURL}/api/v1/order`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                });
                console.log("Response:", response);
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                console.log("Data:", data);

                setOrders(data);
            } catch (error) {
                // setError(error.message);
                // Use sample data if there's an error
                setOrders(sampleOrders);
            } finally {
                setLoading(false);
            }
        };

        // OPTION: Fetch user orders {status: ACTIVE}
        const fetchUserOrders = async () => {
            if (!portfolioId) {
                setError('Portfolio ID not found');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${baseURL}/api/v1/order/portfolio/${portfolioId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                });
                console.log("Response:", response);
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                console.log("Data:", data);

                setOrders(data);
            } catch (error) {
                // setError(error.message);
                // Use sample data if there's an error
                setOrders(sampleOrders);
            } finally {
                setLoading(false);
            }

        }

        if (switchToUserBoard) {
            fetchUserOrders();
        } else {
            fetchOrders();
        }

    }, [switchToUserBoard]);

    const handleCancelOrder = async () => {
        try {
            const response = await fetch(`${baseURL}/api/v1/orders/cancel`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({ order_id: selectedOrderId }),
            });
            if (!response.ok) {
                throw new Error('Failed to cancel order');
            }
            // Remove cancelled order from the list
            setOrders(orders.filter(order => order.id !== selectedOrderId));
            setOpenDialog(false); // Close dialog after cancellation
        } catch (error) {
            console.error(error);
        }
    };

    const handleOpenDialog = (orderId: string) => {
        setSelectedOrderId(orderId);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };


    const handleSwitchBoard = () => {
        switchToUserBoard ? setSwitchToUserBoard(false) : setSwitchToUserBoard(true);
    };

    if (loading) return <Typography>Loading...</Typography>;

    return (
        <>
            <DashboardCard title={switchToUserBoard ? "Outstanding Order Board" : "All Order Board"}>

                <>
                    <Grid container spacing={2}>
                        <Button variant="outlined" color="primary" onClick={handleSwitchBoard}>
                            Switch to {switchToUserBoard ? "All Order Board" : "Outstanding Order Board"}
                        </Button>
                    </Grid>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Side</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Base Currency</TableCell>
                                <TableCell>Quote Currency</TableCell>
                                <TableCell>Total Volume</TableCell>
                                <TableCell>Residual Volume</TableCell>
                                <TableCell>Creation Date</TableCell>
                                <TableCell>Expiry Date</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell>{order.id}</TableCell>
                                        <TableCell>{order.orderSide.charAt(0).toUpperCase() + order.orderSide.slice(1)}</TableCell>
                                        <TableCell>{order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}</TableCell>
                                        <TableCell>{order.orderType.charAt(0).toUpperCase() + order.orderType.slice(1)}</TableCell>
                                        <TableCell>{order.baseFx}</TableCell>
                                        <TableCell>{order.quoteFx}</TableCell>
                                        <TableCell>{order.total.toFixed(2)}</TableCell>
                                        <TableCell>{order.residual.toFixed(2)}</TableCell>
                                        <TableCell>{new Date(order.creationDate).toLocaleString()}</TableCell>
                                        <TableCell>{new Date(order.expiryDate).toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Button variant="outlined" color="primary" onClick={() => handleOpenDialog(order.id)}>
                                                Cancel
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={11} align="center">
                                        <Typography>No orders available</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    <Dialog open={openDialog} onClose={handleCloseDialog}>
                        <DialogTitle>Confirm Cancellation</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to cancel this order?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="primary">
                                No
                            </Button>
                            <Button onClick={handleCancelOrder} color="secondary">
                                Yes, Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            </DashboardCard>
        </>
    );
};

export default ForwardOrderTable;