const hardhat = require('hardhat')
const chalk = require("chalk")

async function run() {
  await network.provider.send("evm_setIntervalMining", [30000] )
  await network.provider.send("evm_setAutomine", [false])
}
run()
