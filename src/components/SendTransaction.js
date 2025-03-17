import React, { useState } from "react";
import { BrowserProvider, parseEther } from "ethers";

const SendTransaction = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const sendTransaction = async () => {
    if (!window.ethereum) {
      setStatus("MetaMask is not installed!");
      return;
    }

    try {
      // Connect to MetaMask
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Transaction details
      const transaction = {
        to: recipient,
        value: parseEther(amount), // Convert ETH to Wei
        gasLimit: 21000, // Standard gas limit for ETH transfer
      };

      // Send transaction
      const tx = await signer.sendTransaction(transaction);
      await tx.wait(); // Wait for confirmation

      setStatus(`✅ Transaction Successful!`);
    } catch (error) {
      console.error("Transaction Error:", error);
      setStatus(`❌ Transaction Failed: ${error.message}`);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>🔗 Send Ethereum</h2>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        style={{ marginBottom: "10px", padding: "8px", width: "300px" }}
      />
      <br />
      <input
        type="text"
        placeholder="Amount (ETH)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ marginBottom: "10px", padding: "8px", width: "300px" }}
      />
      <br />
      <button onClick={sendTransaction} style={{ padding: "10px 20px", fontSize: "16px" }}>
        🚀 Send Transaction
      </button>
      <p style={{ marginTop: "10px", color: "blue" }}>{status}</p>
    </div>
  );
};

export default SendTransaction;
