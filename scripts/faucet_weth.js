const hardhat = require('hardhat')
const chalk = require("chalk")
const users = require('./users.json')
const targets = users

const tokenAddress = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
const whaleAddress = '0xE78388b4CE79068e89Bf8aA7f218eF6b9AB0e9d0' //

async function run() {
  const { ethers, deployments } = hardhat
  const { provider, getContractAt, getContractFactory } = ethers
  const token = await getContractAt('ERC20', tokenAddress)

  const amountToSend = ethers.utils.parseEther('10')

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
