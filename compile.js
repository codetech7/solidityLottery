// const path = require("path");
// const fs = require('fs');
// const solc = require('solc')

// const inboxPath = path.resolve(__dirname, "contracts", "inbox.sol");
// const source = fs.readFileSync(inboxPath, "utf8");


// module.exports = solc.compile(source, 1).contracts[':Inbox'];

const path = require('path');
const fs = require('fs');
const solc = require('solc');

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(lotteryPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[":Lottery"];