import * as dotenv from "dotenv";
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const networks: any = [];

if (process.env.MAINNET_URL && process.env.MAINNET_PRIVATE_KEY) {
  networks.push({
    url: process.env.MAINNET_URL,
    accounts: [process.env.MAINNET_PRIVATE_KEY],
  });
}

if (process.env.TESTNET_URL && process.env.TESTNET_PRIVATE_KEY) {
  networks.push({
    url: process.env.TESTNET_URL,
    accounts: [process.env.TESTNET_PRIVATE_KEY],
  });
}

const config: HardhatUserConfig = {
  defaultNetwork: "testnet",
  networks: {
    mainnet: {
      url: process.env.MAINNET_URL || "",
      accounts: process.env.MAINNET_PRIVATE_KEY
        ? [process.env.MAINNET_PRIVATE_KEY]
        : [],
    },
    testnet: {
      url: process.env.TESTNET_URL,
      accounts: process.env.TESTNET_PRIVATE_KEY
        ? [process.env.TESTNET_PRIVATE_KEY]
        : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 20000,
  },
};

export default config;
