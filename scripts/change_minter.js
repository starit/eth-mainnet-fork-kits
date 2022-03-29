const hardhat = require('hardhat')
const chalk = require("chalk")
const users = require('./users.json')
const targets = users

const tokenAddress = '0xb26C4B3Ca601136Daf98593feAeff9E0CA702a8D'
const minterAddress= '0x28c921adac4c1072658eb01a28da06b5f651ef62' //
const newMinter = '0xD96D57f291096AA637E7502b6D4282815d04f1AC'

async function run() {
  const { ethers, deployments } = hardhat
  const { provider, getContractAt, getContractFactory } = ethers
  const token = await getContractAt('ALDToken', tokenAddress)

  const before_bal = await token.balanceOf(minterAddress);
  console.log('balance reamining in sending account:', before_bal.toString())

  await hardhat.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [minterAddress]}
  );

  const txSigner = await ethers.provider.getSigner(minterAddress)

  const tx = await token.connect(txSigner).setMinter(newMinter, true)
  console.log('new minter set')
  const isMinter = await token.isMinter(newMinter)
  console.log('is minter:', isMinter)
}
run()
