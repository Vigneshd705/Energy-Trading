import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

const Transaction = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [receiver, setReceiver] = useState("");

  const sendTransaction = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const tx = await signer.sendTransaction({
        to: receiver,
        value: ethers.parseEther(amount),
      });

      console.log("Transaction sent:", tx);
      alert(`Transaction sent! Hash: ${tx.hash}`);

      // Navigate to another page after transaction
      navigate("/success");
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed. Check console for details.");
    }
  };

  return (
    <div>
      <h2>Send Transaction</h2>
      <input
        type="text"
        placeholder="Receiver Address"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount (ETH)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={sendTransaction}>Send</button>
    </div>
  );
};

export default Transaction;
