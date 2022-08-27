const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const NFTMint = await hre.ethers.getContractFactory('NFTMint');
  const nftMint = await NFTMint.deploy();

  await nftMint.deployed();

  console.log('NFTMint deployed to:', nftMint.address);

  // For MarketPlace

  const Marketplace = await hre.ethers.getContractFactory('NFTMarketplace');
  const marketplace = await Marketplace.deploy(nftMint.address);

  await marketplace.deployed();

  console.log('Marketplace deployed to:', marketplace.address);

  fs.writeFileSync('./config.js', `
  export const marketplaceAddress = "${nftMint.address}"
  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });