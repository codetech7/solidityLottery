const assert = require("assert");
const Web3 = require("web3");
const ganache = require("ganache-cli");
const { interface , bytecode} = require("../compile");

const web3 = new Web3(ganache.provider());

let accounts, inbox;
const INITIAL_MESSAGE = "Hello World";

beforeEach(async () => {
    //get a list of accounts from ganache
    accounts = await web3.eth.getAccounts();

    //deploy from the first account gotten
   inbox = await new  web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments:[ INITIAL_MESSAGE ]})
    .send({from: accounts[0], gas: 900000}); // returns address of deployed contract on blockchain

}
);

describe("deploy contract", async () => {
  it("can deploy", async () => {
    assert.ok(inbox.options.address);
  });
  //check if it can set constructor message
  it("has a default message",() =>{ 
    const message = await inbox.methods.message().call()
    assert.equal(message, INITIAL_MESSAGE);

  });
  
  //check if it can update
  it("can update", async () => {
    
    inbox.options.setMessage("whatever").call();
    const message = await inbox.methods.message().call();
    assert.equal(message, "whatever");
  })
  
  

});
