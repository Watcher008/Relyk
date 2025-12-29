import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying RELYK with account:", deployer.address);

  const RELYK = await hre.ethers.getContractFactory("RELYK");

  // Pass the initialOwner address to the constructor
  const relyk = await RELYK.deploy(deployer.address);

  await relyk.waitForDeployment();

  const address = await relyk.getAddress();
  console.log("RELYK deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
