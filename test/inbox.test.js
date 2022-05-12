const assert = require("assert");
const Web3 = require("web3");
const ganache = require("ganache-cli");
const { interface , bytecode} = require("../compile");

const web3 = new Web3(ganache.provider());

let accounts, inbox;

beforeEach(async () => {
    //get a list of accounts from ganache
    accounts = await web3.eth.getAccounts();

    //deploy from the first account gotten
   inbox = await new  web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments:[ "Hello World"]})
    .send({from: accounts[0], gas: 1000000}); // returns address of deployed contract on blockchain

}
);

describe("deploy contract", () => {
  it("can deploy", () => {
    console.log(inbox);
  }) 
  
  

}
);