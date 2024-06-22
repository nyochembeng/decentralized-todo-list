const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

const infuraProjectId = process.env.INFURA_PROJECT_ID;
const mnemonic = process.env.MNEMONIC;

module.exports = {
  networks: {
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraProjectId}`),
      network_id: 4,       // Rinkeby's id
      gas: 4500000,        // Gas limit used for deploys
      gasPrice: 10000000000 // 10 gwei
    }
  },
  compilers: {
    solc: {
      version: "0.8.0"    // Fetch exact version from solc-bin (default: truffle's version)
    }
  }
};
