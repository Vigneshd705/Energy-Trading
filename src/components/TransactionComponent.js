import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import Web3 from "web3";

const TransactionComponent = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    loadWeb3();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      const accounts = await web3Instance.eth.requestAccounts();
      setAccount(accounts[0]);
    } else {
      alert("MetaMask not detected! Please install MetaMask.");
    }
  };

  const sendTransaction = async () => {
    if (!receiver || !amount) {
      alert("Please enter receiver address and amount.");
      return;
    }

    try {
      await web3.eth.sendTransaction({
        from: account,
        to: receiver,
        value: web3.utils.toWei(amount, "ether"),
      });
      alert("Transaction Successful!");
    } catch (error) {
      console.error("Transaction Error:", error);
      alert("Transaction Failed!");
    }
  };

  return (
    <Container>
      <Typography variant="h5">💸 Send Transaction</Typography>
      <TextField
        label="Receiver Address"
        fullWidth
        margin="normal"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
        required
      />
      <TextField
        label="Amount (ETH)"
        fullWidth
        margin="normal"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <Button variant="contained" color="primary" onClick={sendTransaction}>
        Send
      </Button>
    </Container>
  );
};

export default TransactionComponent;
