var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Migrations);
};