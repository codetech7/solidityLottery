const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const {interface, bytecode} = require("../compile.js");

const web3 = new Web3(ganache.provider());
let lotteryAccounts, deployment;

beforeEach("", async () => {
 lotteryAccounts = await web3.eth.getAccounts();

  deployment = await new web3.eth.contracts(JSON.parse(interface))
    .deploy({data: bytecode})
    .send({from: lotteryAccounts[0], gas: 1000000});
 
})

describe("lotteryTests", () => {
  it("can be created", () => {
    console.log(lottery);
  })

  it("can be entered", () => {
    
  })

  it("can collect money", () => {
    
  })

  it("can pick a winner", () => {
    
  })

  it("can send money to winner", () => {
    
  })
})
