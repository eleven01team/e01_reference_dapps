var HDWalletProvider = require("truffle-hdwallet-provider");


//var RPC_ENDPOINT = "http://52.175.245.187:8083/api/node/rpc";
//var RPC_ENDPOINT = "http://52.175.216.141:8083/api/node/rpc";
var RPC_ENDPOINT = "http://40.83.215.160:8083/api/node/rpc"
var MNEMONIC = "govern thought stuff monster number inquiry bomb metal mail write episode prepare";

module.exports = {
    networks: {
      development: {
        host: "localhost",
        port: 8545,
        network_id: "*"
      },
      // eleven01: 
      // {
      //   host: '52.142.145.97',
      //   port: 24001,
      //   network_id: "*",
      //   gasPrice : 0,
      //   gas: 4500000,
      // }
      eleven01: {
        provider: function() {
          return new HDWalletProvider(MNEMONIC, RPC_ENDPOINT)
        },
        network_id: "*",
        gasPrice: 0,
        gas: 4500000,
      }
    }
  }