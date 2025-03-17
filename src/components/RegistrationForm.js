import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import Web3 from "web3";

const RegistrationForm = ({ contract }) => {
  const [username, setUsername] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [account, setAccount] = useState("");

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]); // Use first account from MetaMask/Ganache
        setPublicKey(accounts[0]); // Set public key as Ethereum address
      } else {
        alert("Please install MetaMask!");
      }
    };
    loadWeb3();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await contract.methods.registerNode(username, publicKey).send({ from: account });
      alert(`Node "${username}" registered successfully!`);
    } catch (error) {
      console.error("Error registering:", error);
      alert("Registration failed!");
    }
  };

  return (
    <Container>
      <Typography variant="h5">🌐 Register New Node</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Public Key (Ethereum Address)"
          fullWidth
          margin="normal"
          value={publicKey}
          disabled // Prevent manual editing
        />
        <Button variant="contained" color="primary" type="submit">
          Register Node
        </Button>
      </form>
    </Container>
  );
};

export default RegistrationForm;
