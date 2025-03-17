import React, { useState } from "react";
import { Button, TextField, Card, CardContent, Typography } from "@mui/material";
import Web3 from "web3";

export default function SendTransaction() {
  const [account, setAccount] = useState(null);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionHash, setTransactionHash] = useState(null);

  // Connect to MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("MetaMask is not installed! Please install it.");
    }
  };

  // Send transaction
  const sendTransaction = async () => {
    if (!window.ethereum || !account) {
      alert("Please connect MetaMask first!");
      return;
    }

    if (!recipient || !amount) {
      alert("Please enter recipient address and amount!");
      return;
    }

    try {
      const web3 = new Web3(window.ethereum);
      const amountInWei = web3.utils.toWei(amount, "ether");

      const transactionParameters = {
        from: account,
        to: recipient,
        value: amountInWei,
      };

      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      setTransactionHash(txHash);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  return (
    <Card sx={{ marginTop: "20px", padding: "20px", textAlign: "center" }}>
      <CardContent>
        <Typography variant="h6">🔗 Peer-to-Peer Transaction</Typography>

        {account ? (
          <>
            <Typography variant="body1" sx={{ marginBottom: "10px" }}>
              Connected Account: <strong>{account}</strong>
            </Typography>

            <TextField
              label="Recipient Address"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: "10px" }}
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />

            <TextField
              label="Amount (ETH)"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: "10px" }}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={sendTransaction}
            >
              Send Transaction
            </Button>

            {transactionHash && (
              <Typography variant="body2" color="success" sx={{ marginTop: "10px" }}>
                ✅ Transaction Sent! Hash: {transactionHash}
              </Typography>
            )}
          </>
        ) : (
          <Button variant="contained" color="secondary" onClick={connectWallet}>
            Connect MetaMask
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
