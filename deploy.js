const HDWallet = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const {bytecode, interface} = require("./compile");


const provider = new HDWallet("coil rain dwarf earn chase acoustic fold drive wonder mountain sock impact", "https://rinkeby.infura.io/v3/4bf2abe843a049e5b784627c536d31b7");
const web3 = new Web3(provider);


