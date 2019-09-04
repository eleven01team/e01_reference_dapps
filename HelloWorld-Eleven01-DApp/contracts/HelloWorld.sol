pragma solidity ^0.4.24;

contract HelloWorld {

    string public defaultMessage;

    constructor() public  {
        defaultMessage = "Hello World!";
    }

    function Country(string newCountry) public {
        defaultMessage = string(abi.encodePacked("Hello ", newCountry, " from Eleven01"));
    }
}