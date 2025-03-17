import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle";
import BlockchainInfo from "./components/BlockchainInfo";
import PeersList from "./components/PeersList";
import Transactions from "./components/Transactions";
import SendTransaction from "./components/SendTransaction";
import RegistrationForm from "./components/RegistrationForm";
import NodeList from "./components/NodeList";
import TransactionComponent from "./components/TransactionComponent";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Container style={{ padding: "20px", textAlign: "center" }}>
          {/* Header with Theme Toggle */}
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

          {/* Navigation Menu */}
          <nav style={{ marginBottom: "20px" }}>
            <Link to="/" style={navLinkStyle}>🏠 Dashboard</Link>
            <Link to="/register" style={navLinkStyle}>📝 Register Node</Link>
            <Link to="/nodes" style={navLinkStyle}>🔗 Node List</Link>
            <Link to="/transactions" style={navLinkStyle}>💰 Transactions</Link>
            <Link to="/send" style={navLinkStyle}>🚀 Send Transaction</Link>
          </nav>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<BlockchainInfo />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/nodes" element={<NodeList />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/send" element={<SendTransaction />} />
            <Route path="/transaction" element={<TransactionComponent />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

/* Styles for Navigation Links */
const navLinkStyle = {
  margin: "0 15px",
  textDecoration: "none",
  fontWeight: "bold",
  color: "#1976d2",
  fontSize: "18px",
};
