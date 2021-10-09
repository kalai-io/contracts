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

  const { walletAddress } = await prompts({
    type: "text",
    name: "walletAddress",
    message: "Enter you wallet address",
  });

  const { metadataCid } = await prompts({
    type: "text",
    name: "metadataCid",
    message: "Enter your IPFS metadata CID",
  });

  console.log("Getting contract with address:", contractAddress);
  const contract = NFT.attach(contractAddress);
  const contractName = await contract.name();
  console.log("Retrieved contract with name:", contractName);

  const ipfsUrl = `ipfs://${metadataCid}`;
  console.log("Minting NFT on contract with IPFS metadata URL:", ipfsUrl);
  const mintedNft = await contract.mint(walletAddress, ipfsUrl);
  console.log("Minted NFT with hash:", mintedNft.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
