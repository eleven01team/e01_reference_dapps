
var HDWalletProvider = require("truffle-hdwallet-provider");

var Web3 = require("web3");

var RPC_ENDPOINT = "http://40.78.48.235:8083/api/node/rpc";
var MNEMONIC = "govern thought stuff monster number inquiry bomb metal mail write episode prepare";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*"
    },
    eleven01:{
      provider: function() {
        return new HDWalletProvider(MNEMONIC, "http://40.78.48.235:8083/api/node/rpc")
      },
      network_id: "*",
      gasPrice: 0,
      gas: 4500000,
  },
  ropsten:{
    provider: function() {
      return new HDWalletProvider(MNEMONIC, "https://ropsten.infura.io/v3/49095f10f85841de888726a8a1b71841")
    },
    network_id: 3,
    gas: 4000000,
}
}
}

	
	