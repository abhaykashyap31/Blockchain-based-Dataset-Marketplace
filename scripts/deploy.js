async function main() {
  // Get the ContractFactory and Signers
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Compile and deploy the contract
  const Contract = await ethers.getContractFactory("FileStorage");
  const contract = await Contract.deploy();

  console.log("Contract deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
