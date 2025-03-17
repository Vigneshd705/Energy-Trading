import { ethers } from "ethers";

async function fetchTransactions() {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8550"); // Local RPC URL

  const latestBlock = await provider.getBlock("latest"); // Get latest block

  console.log("Latest Block:", latestBlock);

  if (latestBlock && latestBlock.transactions.length > 0) {
    const transactions = await Promise.all(
      latestBlock.transactions.map((txHash) => provider.getTransaction(txHash))
    );
    console.log("Transactions in Latest Block:", transactions);
    return transactions;
  } else {
    console.log("No transactions found.");
    return [];
  }
}

// Call the function
fetchTransactions();
