const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying RELYK with account:", deployer.address);

  const RELYK = await hre.ethers.getContractFactory("RELYK");
  const token = await RELYK.deploy(deployer.address);

  await token.waitForDeployment();

  console.log("RELYK deployed to:", await token.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
