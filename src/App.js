import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ThemeToggle from "./components/ThemeToggle";
import BlockchainInfo from "./components/BlockchainInfo";
import PeersList from "./components/PeersList";
import Transactions from "./components/Transactions";
import SendTransaction from "./components/SendTransaction";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container style={{ padding: "20px", textAlign: "center" }}>
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
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>

        {/* Blockchain Info */}
        <BlockchainInfo />

        {/* Peers List */}
        <PeersList />

        {/* Transactions */}
        <Transactions />

        <SendTransaction />

      </Container>
    </ThemeProvider>
  );
}
