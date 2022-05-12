const assert = require("assert");
const Web3 = require("web3");
const ganache = require("ganache-cli");
const { bytecode } = require("../compile");

const web3 = new Web3(ganache.provider());

let accounts;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
}
);

describe("deploy contract", () => {
  it("can deploy", () => {
    console.log(accounts[0]);
  }) 
  
  

}
);