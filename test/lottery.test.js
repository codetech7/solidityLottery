const ganache = require('ganache-core');
const Web3 = require('web3');
const assert = require("assert");

// const options = { gasLimit: web3.utils.toWei("2", "ether") };
// const provider = ganache.provider(options);
// quote from doc "Both .provider() and .server() take a single object
// which allows you to specify behavior of ganache-cli"
// https://github.com/trufflesuite/ganache-cli#using-ganache-cli
const web3 = new Web3(ganache.provider({gasLimit : 10000000}));

const {interface, bytecode} = require('../compile');


let lotteryAccounts;
let deployment;

beforeEach(async () => {
 lotteryAccounts = await web3.eth.getAccounts();

  deployment = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode})
    .send({from: lotteryAccounts[0], gas: 1000000});
 
});

 describe("lotteryTests",  () => {
    it("can be created", () => {
      assert(deployment.options["address"]);
    })

   it("can be entered", () => {
      assert(deployment.methods.enter().send({from: lotteryAccounts[0], gas: 1000000}));
   });

   it("the money modifier works", () => {
    
   });

//   it("can pick a winner", () => {
    
//   });

//   it("can send money to winner", () => {
    
//   });
 });
