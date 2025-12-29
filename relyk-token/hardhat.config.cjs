require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

console.log("Loaded RPC:", process.env.POLYGON_RPC_URL);

module.exports = {
  solidity: "0.8.20",
  networks: {
    polygon: {
      url: process.env.POLYGON_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    polygonAmoy: {
      url: process.env.AMOY_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 80002, // make sure this matches Amoy's chain ID
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
    customChains: [
      {
        network: "polygonAmoy",
        chainId: 80002,
        urls: {
          apiURL: "https://api-testnet.polygonscan.com/api", // replace with Amoy explorer API if different
          browserURL: "https://mumbai.polygonscan.com/",     // replace with Amoy explorer URL if different
        },
      },
    ],
  },
};
