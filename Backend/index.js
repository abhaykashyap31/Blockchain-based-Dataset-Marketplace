require('dotenv').config();
const express = require('express');
const { ethers } = require('ethers');
const bodyParser = require('body-parser');
const fs = require('fs');

// Load contract ABI and address from file
const contractData = JSON.parse(fs.readFileSync('Backend/abi.json', 'utf8'));
const contractABI = contractData.abi;
const contractAddress = contractData.address;

const app = express();
app.use(bodyParser.json());

// Connect to Ethereum network (Hardhat or mainnet)
const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// API Routes
// Upload file
app.post('/upload', async (req, res) => {
  const { fileHash } = req.body;

  try {
    const tx = await contract.uploadFile(fileHash);
    await tx.wait(); // Wait for transaction to be mined
    res.json({ message: 'File uploaded successfully', fileHash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Grant access
app.post('/grant-access', async (req, res) => {
  const { fileHash, user } = req.body;

  try {
    const tx = await contract.grantAccess(fileHash, user);
    await tx.wait(); // Wait for transaction to be mined
    res.json({ message: 'Access granted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check access
app.get('/check-access/:fileHash/:user', async (req, res) => {
  const { fileHash, user } = req.params;

  try {
    const hasAccess = await contract.checkAccess(fileHash, user);
    res.json({ fileHash, user, hasAccess });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
