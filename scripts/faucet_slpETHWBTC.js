const hardhat = require('hardhat')
const chalk = require("chalk")
const users = require('./users.json')
const targets = users
// const targets = ["0xcc1194930B624b94f0365143c18645a329794366", "0x47F7EA0dd4418AA1cec00786F5C47623aC37bA42"]

const tokenAddress = '0xceff51756c56ceffca006cd410b03ffc46dd3a58'
const whaleAddress = '0xa019a71f73922f5170031f99efc37f31d3020f0b'

async function run() {
  const { ethers, deployments } = hardhat
  const { provider, getContractAt, getContractFactory } = ethers
  const token = await getContractAt('ERC20', tokenAddress)

  const amountToSend = ethers.utils.parseEther('0.0000001')

  const before_bal = await token.balanceOf(whaleAddress);
  console.log('balance reamining in sending account:', before_bal.toString())

  await hardhat.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [whaleAddress]}
  );

  const sushiPoolSigner = await ethers.provider.getSigner(whaleAddress)


  for (let i = 0; i < targets.length; i++) {
    const tx = await token.connect(sushiPoolSigner).transfer(targets[i], amountToSend)
    console.log(chalk.dim(`Sending  token to ${targets[i]}...`))
    const rc = await tx.wait(1);
    const bal = await token.balanceOf(targets[i]);
    console.log('balance of ', bal.toString())
  }
}
run()
