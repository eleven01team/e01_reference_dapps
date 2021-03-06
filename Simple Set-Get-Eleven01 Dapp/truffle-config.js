var HDWalletProvider = require("truffle-hdwallet-provider");

var Web3 = require("web3");

var RPC_ENDPOINT = "http://104.40.3.236:8083/api/node/rpc";

//var RPC_ENDPOINT = "http://test-rpc.eleven01.io/api/node/rpc";

var MNEMONIC = "monkey move garbage glide cricket what smile soap miss trumpet portion either";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*"
    },
    eleven01: {
      provider: function () {
        return new HDWalletProvider(MNEMONIC, RPC_ENDPOINT)
      },
      network_id: "*",
      gasPrice: 0,
      gas: 4500000,
    }
  }
}