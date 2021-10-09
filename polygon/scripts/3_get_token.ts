import { config, ethers, hardhatArguments } from "hardhat";
import prompts from "prompts";

async function main() {
  const network = hardhatArguments.network || "testnet";
  console.log("Using network:", network);
  const { gas, gasPrice } = config.networks[network];
  console.log("Using gas", gas, "with gas price", gasPrice);

  console.log("Using contract:", "KalaiNFT");
  const NFT = await ethers.getContractFactory("KalaiNFT");

  const { contractAddress } = await prompts({
    type: "text",
    name: "contractAddress",
    message: "Enter the contract address",
  });

  console.log("Getting contract with address:", contractAddress);
  const contract = NFT.attach(contractAddress);
  const contractName = await contract.name();
  console.log("Retrieved contract with name:", contractName);

  console.log("Getting owner of contract at position:", 1);
  const owner = await contract.ownerOf(1);
  console.log("Retrieved owner:", owner);

  console.log("Getting token URI at position:", 1);
  const uri = await contract.tokenURI(1);
  console.log("Retrieved URI: ", uri);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
