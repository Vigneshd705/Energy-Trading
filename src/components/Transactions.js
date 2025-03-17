import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import axios from "axios";

const BESU_NODE_URL = "http://127.0.0.1:8550";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.post(BESU_NODE_URL, {
        jsonrpc: "2.0",
        method: "eth_getBlockByNumber",
        params: ["latest", true],
        id: 4,
      });

      setTransactions(response.data.result?.transactions || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  return (
    <Card sx={{ marginTop: "20px", padding: "10px", textAlign: "left" }}>
      <CardContent>
        <Typography variant="h6" style={{ marginBottom: "10px" }}>
          🔄 Latest Transactions
        </Typography>
        {transactions.length > 0 ? (
          <List>
            {transactions.map((tx, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={`Txn Hash: ${tx.hash}`}
                    secondary={`From: ${tx.from} → To: ${tx.to}`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Typography color="textSecondary">No recent transactions</Typography>
        )}
      </CardContent>
    </Card>
  );
}
