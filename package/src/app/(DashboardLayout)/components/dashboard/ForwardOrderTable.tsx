import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';

const sampleOrders = [
  {
    id: "1",
    order_side: "buy",
    order_status: "active",
    order_type: "market",
    creation_date: "2024-09-06T00:00:00Z",
    expiry_date: "2024-09-10T00:00:00Z",
    fk_base_currency_code: "USD",
    fk_quote_currency_code: "EUR",
    total: 10000,
    residual: 2500,
    limit: 1.15,
  },
];

const ForwardOrderTable: React.FC = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      const portfolioId = localStorage.getItem('portfolioId'); // Get portfolio ID from local storage
      if (!portfolioId) {
        setError('Portfolio ID not found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${baseURL}/api/v1/order/portfolio/${portfolioId}?orderStatus=ACTIVE`);
        console.log("Response:", response);
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
  }, [baseURL]);

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

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <DashboardCard>
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
                <TableCell>{order.order_side.charAt(0).toUpperCase() + order.order_side.slice(1)}</TableCell>
                <TableCell>{order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}</TableCell>
                <TableCell>{order.order_type.charAt(0).toUpperCase() + order.order_type.slice(1)}</TableCell>
                <TableCell>{order.fk_base_currency_code}</TableCell>
                <TableCell>{order.fk_quote_currency_code}</TableCell>
                <TableCell>{order.total.toFixed(2)}</TableCell>
                <TableCell>{order.residual.toFixed(2)}</TableCell>
                <TableCell>{new Date(order.creation_date).toLocaleString()}</TableCell>
                <TableCell>{new Date(order.expiry_date).toLocaleString()}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => handleOpenDialog(order.id)}>
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
    </DashboardCard>
  );
};

export default ForwardOrderTable;