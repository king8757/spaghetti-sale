// const Web3 = require('web3')

// const getWeb3Instance = (host, port, protocol) => {
//   web3 = new Web3(new Web3.providers.HttpProvider(protocol + '://' + host + ':' + port))
//   console.log(`[live gasPrice]: ${web3.eth.gasPrice.toNumber()}`)
//   return web3
// }

const HDWalletProvider = require('truffle-hdwallet-provider')
const config           = require('./config/config')

module.exports = {
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    development: { // npm run ganache
      host: 'localhost',
      port: 7545,
      network_id: '8994',
      gas: 800000,
      gasPrice: 2000000000
    },
    parity: { // private parity remote node
      host: 'eidoo-dev-1.bchainapi.net', //wally-api-dev.undo.it',
      port: 8545,
      gas: 800000,
      gasPrice: 22000000000,
      network_id: '8995'
    },
    ropsten: {
      provider: new HDWalletProvider(config.hd_wallet_mnemonic, `https://ropsten.infura.io/v3/${config.infura_apikey}`, config.indexId),
      gas: 4700000,
      gasPrice: 5000000000,
      network_id: 3
    },
    mainet: {
      host: 'localhost', // local parity mainet node
      port: 8545,
      gas: 800000,
      gasPrice: 2000000000,
      network_id: '1',
      from: ''
    }
  },
  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions : {
      currency: 'EUR',
      gasPrice: 2,
    }
  }
}