async function main() {
    // Get the contract address from the deployment script
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with the actual contract address
  
    // Get the contract and signer
    const [deployer] = await ethers.getSigners();
    const FileStorage = await ethers.getContractFactory("FileStorage");
    const fileStorage = FileStorage.attach(contractAddress);
  
    // Example: Upload a file (IPFS hash)
    const fileHash = "Qm..."; // Replace with an actual file hash
    const tx = await fileStorage.uploadFile(fileHash);
    await tx.wait();
    console.log("File uploaded successfully!");
  
    // Example: Grant access
    const userAddress = "0x..."; // Address of the user to grant access
    const tx2 = await fileStorage.grantAccess(fileHash, userAddress);
    await tx2.wait();
    console.log("Access granted!");
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  