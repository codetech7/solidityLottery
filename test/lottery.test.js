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
    try{
       
      deployment.methods.enter().send({from: lotteryAccounts[0], gas: 10});
      
      assert(false);

    } catch(err){
      assert(err);
    }
   });

   it("the restricted modifier works", () => {
    try{
      deployment.methods.pickWinner().send({from: lotteryAccounts[1], gas: 1000000});

      assert(false);

    } catch(error){
      assert(error);
    }
   });

   it("can be entered", async () => { // the player gets added to the lotteryPlayers array
      let arrayTemp = await deployment.methods.playerList().call({from: lotteryAccounts[0], gas: 1000000});
      let initialArrayLength = arrayTemp.length //note that length is not a function but a property
      let funcCall = await deployment.methods.enter().send({from: lotteryAccounts[8], gas: 1000000, value : 1000});
      console.log(funcCall);
      let finalArrayLenght = arrayTemp.length;
      assert(deployment.options.address, funcCall['to']);
      assert(initialArrayLength+1, finalArrayLenght);
    //  const players = deployment.methods.playerList().call({})
    //   assert(lotteryAccounts[8], players);
   });
   
   it("total pool increases as people enter", async () => {
      const initialPool = await deployment.methods.totalPool().call();
      await deployment.methods.enter().send({from: lotteryAccounts[8], gas: 1000000, value: 1000});
      const finalPool = deployment.methods.totalPool().call();
      assert(finalPool > initialPool);
    
  });

  it("pickwinner works", async () => {
    const initialPlayerBalance = await deployment.methods.showPlayerBalance().call({from: lotteryAccounts[5]});
    const initialNumberOfPlayers = await deployment.methods.numberOfPlayers().call();
    await deployment.methods.enter().send({from: lotteryAccounts[5], value: 1001, gas: 100000});
    const mediumNumberOfPlayers = await deployment.methods.numberOfPlayers().call();
    await deployment.methods.pickWinner().send({from: lotteryAccounts[0], gas: 70000});
    const finalNumberOfPlayers = await deployment.methods.numberOfPlayers().call();
    const finalPlayerBalance = await deployment.methods.showPlayerBalance().call({from: lotteryAccounts[5]});

    assert(initialPlayerBalance < finalPlayerBalance);
    assert.equal(0, initialNumberOfPlayers);
    assert.equal(1, mediumNumberOfPlayers);
    assert.equal(0, finalNumberOfPlayers);
    
        // const fromM = await deployment.methods.showPlayerBalance().call();
        // const fromFive = await deployment.methods.showPlayerBalance().call({from: lotteryAccounts[5]});
        // const unknown = await deployment.methods.showPlayerBalance().call();
        // const fromZero = await deployment.methods.showPlayerBalance().call({from: lotteryAccounts[0]});
    
        // console.log(fromM);
        // console.log(fromFive);
        // console.log(unknown);
        // console.log("from zero:", fromZero);
    
    
    
  });
 });
