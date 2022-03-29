const hardhat = require('hardhat')
const chalk = require("chalk")
const targets = require('./users.json')



async function run() {
  const { ethers, deployments } = hardhat
  const { provider, getContractAt, getContractFactory } = ethers
  // const sushiPool = await ethers.provider.getUncheckedSigner('0x397ff1542f962076d0bfe58ea045ffa2d347aca0')
  console.log('run here 1')
  const tokenAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'
  const token = await getContractAt('ERC20', tokenAddress)

  // const sushiPool = "0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd"
  const binance = "0x1062a747393198f70F71ec65A582423Dba7E5Ab3"
  const before_bal = await token.balanceOf(binance);
  console.log('balance reamining in sending account:', before_bal.toString())

  await hardhat.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [binance]}
  );

  const sushiPoolSigner = await ethers.provider.getSigner(binance)


  // const targets = ['0x47F7EA0dd4418AA1cec00786F5C47623aC37bA42']
  const amountToSend = ethers.utils.parseEther('0.000005')
  for (let i = 0; i < targets.length; i++) {
    const tx = await token.connect(sushiPoolSigner).transfer(targets[i], amountToSend)
    console.log(chalk.dim(`Sending  token to ${targets[i]}...`))
    const rc = await tx.wait(1);
    const bal = await token.balanceOf(targets[i]);
    console.log('balance of ', bal.toString())
  }
}
run()
