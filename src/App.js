import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const BESU_NODE_URL = "http://127.0.0.1:8550"; // Update with your Besu node

export default function App() {
  const [blockNumber, setBlockNumber] = useState(null);
  const [peers, setPeers] = useState(0);
  const [peerList, setPeerList] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

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

      // Get the total peer count
      const peerResponse = await axios.post(BESU_NODE_URL, {
        jsonrpc: "2.0",
        method: "net_peerCount",
        params: [],
        id: 2,
      });

      // Get peer details
      const peerInfoResponse = await axios.post(BESU_NODE_URL, {
        jsonrpc: "2.0",
        method: "admin_peers",
        params: [],
        id: 3,
      });

      const peerList = peerInfoResponse.data.result || [];
      const peerCount = parseInt(peerResponse.data.result, 16);

      // Ensure both values are in sync
      setPeers(peerList.length > 0 ? peerList.length : peerCount);
      setPeerList(peerList);

      // Get latest transactions
      const blockDetailsResponse = await axios.post(BESU_NODE_URL, {
        jsonrpc: "2.0",
        method: "eth_getBlockByNumber",
        params: ["latest", true],
        id: 4,
      });

      setTransactions(blockDetailsResponse.data.result?.transactions || []);
    } catch (error) {
      console.error("Error fetching blockchain data:", error);
    }
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container style={{ padding: "20px", textAlign: "center" }}>
        {/* Header Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            🔗 Hyperledger Besu Dashboard
          </Typography>
          <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </div>

        {/* Blockchain Data Section */}
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

        {/* Peers List */}
        <Card sx={{ marginTop: "20px", padding: "10px", textAlign: "left" }}>
          <CardContent>
            <Typography variant="h6" style={{ marginBottom: "10px" }}>
              🌍 Connected Peer Details
            </Typography>
            {peerList.length > 0 ? (
              <List>
                {peerList.map((peer, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={`Peer ${index + 1}`}
                        secondary={`ID: ${peer.id} | IP: ${peer.network.remoteAddress}`}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography color="textSecondary">No peers connected</Typography>
            )}
          </CardContent>
        </Card>

        {/* Transaction History */}
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
      </Container>
    </ThemeProvider>
  );
}
