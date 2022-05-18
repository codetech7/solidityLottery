

pragma solidity ^0.4.17;

 contract Lottery{
     address public manager;
     address[] public lotteryPlayers;
    // address[] private  requesters;
   //  string public password;
     //string public username;

     function Lottery() public payable {
        
         manager = msg.sender;  //the manager is the person who requested to create an object of the class
         //username = user;       //create username and password that will be used for validating who the new manager is
         //password = pass;

        
     }

     modifier money(){  //used to require that the function is called with some certain amount of money alongside payable
         require(msg.value > 100 wei);
         _;

     }

    // function requestMoney() public {
    //     requesters.push(msg.sender);
    // }

    //  function moveMoney() public payable money {  //used to move money through a contract from one account to another.
    //     //least amount to be sent is 100000 wei

    //     uint index = pseudoRandom() % requesters.length; 
    //     requesters[index].transfer(msg.value);
    
    //  }

    //  function showPlayerBalance() public view returns(uint) {
    //      return msg.sender.balance;

    //  }

     function enter() public payable money {
        // require(msg.value > 100000 wei); //every player must enter the lottery with at least .01 ether.

         lotteryPlayers.push(msg.sender); // everyone who calls the enter function is a player and added to player array.
         
     }

    // function totalPool() public view returns(uint256) { //returns the total money contributed.
    //     return this.balance;
    // }

    //  function playerList() public view returns(address[]){ //returns how many players are in the contract
    //   return lotteryPlayers;
    //  }

     function pickWinner() public restricted returns (address) { //picks the final winner using a pseudi random mechanism
        uint index = pseudoRandom() % lotteryPlayers.length;
         lotteryPlayers[index].transfer(this.balance);
        
         lotteryPlayers = new address[](0);  //use this to cleAR players list after picking a winner

     }

     function pseudoRandom() private view returns(uint){ //generates a random number;
        return uint(keccak256(block.difficulty, now, lotteryPlayers)); //pseudo random number generation.
     }

     modifier restricted(){
         require(manager == msg.sender);
         _;
     }

    //  function setNewManager(/*string user, string pass*/) public { //sets a new manager for the funxtion.
    //    //  require(user == this.username);
    //  //    require(pass == this.password);
    //      manager = msg.sender;
    //  }

     }
 
















 