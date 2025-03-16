import React, { useState } from "react";

const MetaMaskIntegration = () => {
  const [account, setAccount] = useState(null);
  const [txHash, setTxHash] = useState("");

  // Connect MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        console.log("Connected Account:", accounts[0]);
      } catch (error) {
        console.error("User denied account access", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  // Send Transaction
  const sendTransaction = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed!");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const sender = accounts[0]; // Get the first connected account

      const transactionParameters = {
        from: sender,
        to: "0xReceiverAddressHere", // Change to your recipient's address
        value: "0x" + (0.01 * 10 ** 18).toString(16), // Sending 0.01 ETH (convert to Wei)
        gas: "0x5208", // Gas limit (21000 in hex)
      };

      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      console.log("Transaction Sent! Hash:", txHash);
      setTxHash(txHash);
      alert(`Transaction Sent! Hash: ${txHash}`);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  return (
    <div>
      <h2>MetaMask Integration</h2>
      <button onClick={connectWallet}>Connect MetaMask</button>
      {account && <p>Connected Account: {account}</p>}
      <button onClick={sendTransaction}>Send 0.01 ETH</button>
      {txHash && <p>Transaction Hash: {txHash}</p>}
    </div>
  );
};

export default MetaMaskIntegration;
