const hardhat = require('hardhat')
const chalk = require("chalk")
const users = require('./users.json')
const targets = users

const tokenAddress = '0x06325440D014e39736583c165C2963BA99fAf14E'
const whaleAddress = '0x56c915758ad3f76fd287fff7563ee313142fb663' //

async function run() {
  const { ethers, deployments } = hardhat
  const { provider, getContractAt, getContractFactory } = ethers
  const token = await getContractAt('ERC20', tokenAddress)

  const amountToSend = ethers.utils.parseEther('20')

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
