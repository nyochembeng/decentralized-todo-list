const HDWalletProvider = require('@truffle/hdwallet-provider');
const env = require('./env.json');
require('dotenv').config();

const infuraProjectId = env.REACT_APP_INFURA_PROJECT_ID;
const mnemonic = env.REACT_APP_MNEMONIC;

module.exports = {
  networks: {
    mainnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://mainnet.infura.io/v3/${infuraProjectId}`),
      network_id: 1,       // Ethereum mainnet ID
      gas: 5500000,        // Gas limit
      gasPrice: 20000000000, // 20 Gwei
      timeoutBlocks: 200,  // Increase timeout blocks
      skipDryRun: true,    // Skip dry run before migrations
      confirmations: 2,    // # of confirmations to wait between deployments
      timeoutBlocks: 200
    },
    // Other network configurations...
  },
  compilers: {
    solc: {
      version: "0.8.0"    // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
  // Other Truffle configurations...
};
