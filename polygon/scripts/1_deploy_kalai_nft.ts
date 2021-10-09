import { ethers, hardhatArguments } from "hardhat";

async function main() {
  console.log("Using network:", hardhatArguments.network);

  console.log("Using contract", "KalaiNFT");
  const NFT = await ethers.getContractFactory("KalaiNFT");

  console.log("Deploying KalaiNFT...");
  const nft = await NFT.deploy();

  await nft.deployed();

  console.log("Kalai NFT deployed to:", nft.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
