const HDWallet = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const {bytecode, interface} = require("./compile");


const provider = new HDWallet("coil rain dwarf earn chase acoustic fold drive wonder mountain sock impact", "https://rinkeby.infura.io/v3/4bf2abe843a049e5b784627c536d31b7");
const web3 = new Web3(provider);

const deploy = async () => {
  

const account = await web3.eth.getAccounts();
console.log("attemppting to deploy from:", account[0]); //display which account we are deploying from

const inbox = await new web3.eth.Contract(JSON.parse(interface)) //defines interface for contract deployment
    .deploy({data: bytecode, arguments : ["Heloo World"]}) //creates a transaction object to be deployed
    .send({from: account[0], gas: 1000000}); //sends the transaction object created earlierto the network

console.log("contract deployed:", inbox.options.address); //log the address the contract waas deployed to.
}


deploy();