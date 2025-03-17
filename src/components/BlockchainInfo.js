import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";

const BESU_NODE_URL = "http://127.0.0.1:8550";

export default function BlockchainInfo() {
  const [blockNumber, setBlockNumber] = useState(null);
  const [peers, setPeers] = useState(0);

  useEffect(() => {
    fetchBlockchainData();
  }, []);

  const fetchBlockchainData = async () => {
    try {
      const blockResponse = await axios.post(BESU_NODE_URL, {
        jsonrpc: "2.0",
        method: "eth_blockNumber",
        params: [],
        id: 1,
      });
      setBlockNumber(parseInt(blockResponse.data.result, 16));

      const peerResponse = await axios.post(BESU_NODE_URL, {
        jsonrpc: "2.0",
        method: "net_peerCount",
        params: [],
        id: 2,
      });
      setPeers(parseInt(peerResponse.data.result, 16));
    } catch (error) {
      console.error("Error fetching blockchain data:", error);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card sx={{ textAlign: "center", padding: "10px" }}>
          <CardContent>
            <Typography variant="h6">📦 Latest Block</Typography>
            <Typography variant="h4">{blockNumber ?? "Loading..."}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card sx={{ textAlign: "center", padding: "10px" }}>
          <CardContent>
            <Typography variant="h6">🔗 Connected Peers</Typography>
            <Typography variant="h4">{peers}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
