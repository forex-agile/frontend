import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { isOverflown } from "@mui/x-data-grid/utils/domUtils";
import { use, useEffect, useState } from "react";

const RecentTransactions = () => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [trades, setTrades] = useState<
    {
      id: string;
      orderId: string;
      portfolioId: string;
      userId: string;
      orderSide: string;
      orderStatus: string;
      orderType: string;
      creationDate: string;
      expiryDate: string;
      baseFx: {
        currencyCode: string;
        currencyName: string;
      };
      quoteFx: {
        currencyCode: string;
        currencyName: string;
      };
      total: number;
      residual: number;
      limit: number;
      executionDate: string;
      baseFxAmount: number;
      quoteFxAmount: number;
    }[]
  >([]);
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  const portfolioId =
    parsedUser && parsedUser.portfolioId ? parsedUser.portfolioId : null;
  const userId = parsedUser && parsedUser.id ? parsedUser.id : null;

  useEffect(() => {
    fetch(`${baseURL}/api/v1/trade/portfolio/${portfolioId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((text) => {
        if (!text) {
          throw new Error("Response body is empty");
        }
        return JSON.parse(text); // Parse JSON only if text is not empty
      })
      .then((data) => {
        setTrades(data); // Set the response data into trades
      })
      .catch((error) => {
        console.error("Error fetching recent transactions:", error);
      });
  }, []);

  return (
    <DashboardCard title="Recent Transactions">
      <>
        {" "}
        <Box
          style={{
            maxHeight: "300px",
            overflow: "auto",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Trade ID</TableCell>
                <TableCell>Order ID</TableCell>
                <TableCell>Portfolio ID</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Side</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Base Amount</TableCell>
                <TableCell>Quote Amount</TableCell>
                <TableCell>Total Volume</TableCell>
                <TableCell>Residual Volume</TableCell>
                <TableCell>Limit</TableCell>
                <TableCell>Execution Date</TableCell>
                <TableCell>Creation Date</TableCell>
                <TableCell>Expiry Date</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {trades.length > 0 ? (
                trades.map((trade) => (
                  <TableRow key={trade.id}>
                    <TableCell>{trade.id}</TableCell>
                    <TableCell>{trade.orderId}</TableCell>
                    <TableCell>{trade.portfolioId}</TableCell>
                    <TableCell>{trade.userId}</TableCell>
                    <TableCell>
                      {trade.orderSide.charAt(0).toUpperCase() +
                        trade.orderSide.slice(1)}
                    </TableCell>
                    <TableCell>
                      {trade.orderStatus.charAt(0).toUpperCase() +
                        trade.orderStatus.slice(1)}
                    </TableCell>
                    <TableCell>
                      {trade.orderType.charAt(0).toUpperCase() +
                        trade.orderType.slice(1)}
                    </TableCell>
                    <TableCell>
                      {trade.baseFx.currencyCode + trade.baseFxAmount}
                    </TableCell>
                    <TableCell>
                      {trade.quoteFx.currencyCode + trade.quoteFxAmount}
                    </TableCell>
                    <TableCell>
                      {trade.total.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell>{trade.residual.toLocaleString()}</TableCell>
                    <TableCell>{trade.limit.toLocaleString()}</TableCell>
                    <TableCell>
                      {new Date(trade.executionDate).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {new Date(trade.creationDate).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {new Date(trade.expiryDate).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={11} align="center">
                    <Typography>No trades available</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </>
    </DashboardCard>
  );
};

export default RecentTransactions;
