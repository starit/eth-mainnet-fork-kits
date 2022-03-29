const hardhat = require('hardhat')
const chalk = require("chalk")
const users = require('./users.json')
const targets = users

async function run() {
  const { ethers, deployments } = hardhat
  const { provider, getContractAt, getContractFactory } = ethers

  const amountToSet = ethers.utils.hexlify(ethers.utils.parseEther('100000'))

  for (let i = 0; i < targets.length; i++) {
    // console.log('balance', await network.provider.getBalance(targets[i]));
    await network.provider.send("hardhat_setBalance", [
    	targets[i],
    	amountToSet,
    ]);
    console.log('set account balance', targets[i], 'balance:', amountToSet)
  }
}
run()
