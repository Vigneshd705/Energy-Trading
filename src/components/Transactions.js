import React, { useState, useEffect } from "react";
import { BrowserProvider, formatUnits } from "ethers";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!window.ethereum) {
        console.log("MetaMask is not installed!");
        return;
      }

      try {
        setLoading(true);
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAddress = (await signer.getAddress()).toLowerCase();
        setAccount(userAddress);

        const latestBlock = await provider.getBlockNumber();
        const blocksToScan = 100; // Scan last 100 blocks
        let userTransactions = [];

        for (let i = latestBlock; i > latestBlock - blocksToScan; i--) {
          const block = await provider.getBlock(i, true); // Fetch full transactions

          if (block && block.transactions.length > 0) {
            for (const txHash of block.transactions) {
              // Ensure we fetch full transaction details
              const tx = await provider.getTransaction(txHash);

              if (tx && (tx.from.toLowerCase() === userAddress || (tx.to && tx.to.toLowerCase() === userAddress))) {
                userTransactions.push(tx);
              }
            }
          }
        }

        setTransactions(userTransactions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>📜 Transaction History</h2>
      <p><strong>Your Address:</strong> {account}</p>

      {loading ? (
        <p>Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table border="1" style={{ width: "100%", marginTop: "10px", textAlign: "left" }}>
          <thead>
            <tr>
              <th>Txn Hash</th>
              <th>To</th>
              <th>Value (ETH)</th>
              <th>Block</th>
            </tr>
          </thead>
          <tbody>
            {transactions.slice(0, 10).map((tx, index) => (
              <tr key={index}>
                <td>{tx.hash.slice(0, 10)}...</td>
                <td>{tx.to ? tx.to : "Contract Creation"}</td>
                <td>{formatUnits(tx.value, 18)}</td>
                <td>{tx.blockNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Transactions;
