import { expect } from "chai";
import { ethers } from "hardhat";

describe("KalaiNFT", function () {
  it("It should deploy the contract, mint a token, and resolve to the right URI", async function () {
    const NFT = await ethers.getContractFactory("KalaiNFT");
    const nft = await NFT.deploy();
    const URI = "ipfs://QmaTxXUj1oGLfGi5EzXQ5D18gcRw1P4rKKToBo8goQMa4o";
    await nft.deployed();
    await nft.mint("0x7028f6756a9b815711bc2d37e8d5be23fdac846d", URI);
    expect(await nft.tokenURI(1)).to.equal(URI);
  });
});
