# DataScienceHub | Blockchain-Based Dataset Marketplace

## Overview
DataScienceHub is a blockchain-based marketplace designed for seamless uploading, downloading, and exchanging of datasets. Built with modern web technologies, it ensures secure transactions using Ethereum smart contracts, distributed storage via IPFS, and efficient data retrieval using B-trees.

## Features
- **Dataset Exchange**: Users can upload and download datasets with ease.
- **Blockchain Security**: Ethereum-based smart contracts secure transactions.
- **Distributed Storage**: Integrated IPFS for decentralized and reliable dataset storage.
- **Efficient Search**: Utilized B-trees for dataset/article retrieval, reducing search time by 30%.
- **Reward System**: Users are rewarded with digital currency for dataset exchanges.

## Tech Stack
- **Frontend**: React.js
- **Database**: MongoDB
- **Distributed Storage**: IPFS
- **Blockchain**: Ethereum (Smart Contracts)

## Project Duration
October 2024 – November 2024

## Installation and Setup
Follow these steps to set up and run DataScienceHub locally:

### Prerequisites
- Node.js (v16 or above)
- MongoDB (locally installed or cloud-based)
- npm or yarn
- Ethereum Wallet (e.g., MetaMask)

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/datasciencehub.git
   cd datasciencehub
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory and add the following:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     REACT_APP_IPFS_GATEWAY=your_ipfs_gateway
     SMART_CONTRACT_ADDRESS=your_contract_address
     PRIVATE_KEY=your_private_key
     ```

4. **Deploy Smart Contracts**:
   - Use Truffle or Hardhat to deploy the smart contract to an Ethereum network.
   - Update the `SMART_CONTRACT_ADDRESS` in the `.env` file.

5. **Start the Application**:
   - Start the backend:
     ```bash
     npm run start
     # or
     yarn start
     ```
   - Start the frontend:
     ```bash
     cd client
     npm start
     ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Usage
1. **Sign Up**:
   - Create a new account or connect using your Ethereum wallet.
2. **Upload Datasets**:
   - Upload datasets to IPFS and share metadata on the marketplace.
3. **Download Datasets**:
   - Browse and purchase datasets using digital currency.
4. **Earn Rewards**:
   - Gain digital currency rewards for dataset uploads and transactions.

## Key Components
- **Smart Contracts**: Enable secure and transparent dataset transactions on the Ethereum blockchain.
- **Distributed Storage**: IPFS ensures datasets are stored in a decentralized manner.
- **Efficient Retrieval**: B-trees reduce search time for datasets and articles by 30%.

## Future Enhancements
- **Advanced Search Filters**: Include filters for dataset categories, sizes, and ratings.
- **Mobile Application**: Develop a companion app for Android and iOS.
- **Cross-Blockchain Compatibility**: Support other blockchain platforms like Solana or Binance Smart Chain.

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature/bugfix.
3. Submit a pull request.
