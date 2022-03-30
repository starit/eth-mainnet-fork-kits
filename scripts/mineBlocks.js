const hardhat = require('hardhat')
const chalk = require("chalk")


// ref: https://ethereum.stackexchange.com/questions/86633/time-dependent-tests-with-hardhat
async function run() {
  const oneHour = 3600
  const oneBlock = 13
  const blocksToMine = 6400 * 258
  for (let i = 0; i < blocksToMine; i++ ) {
    await network.provider.send("evm_increaseTime", [oneBlock])
    await network.provider.send("evm_mine")
  }
}
run()
