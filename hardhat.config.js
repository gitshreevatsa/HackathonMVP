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
   accounts: ["117849d1c1970d31441800f4a100a4077044b45243d8c8155deff9754bcdddb6"]
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