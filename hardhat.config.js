/* hardhat.config.js */
require("@nomiclabs/hardhat-waffle")

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
//  unused configuration commented out for now
 mumbai: {
   url: "https://rpc-mumbai.maticvigil.com",
   accounts: ["f01635ab723c226ad5d2fdf9a468fdb59a681d1b4441fc1ac02c0a77cc02ec04"]
 }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}