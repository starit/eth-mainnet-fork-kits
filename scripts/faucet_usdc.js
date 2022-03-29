const hardhat = require('hardhat')
const chalk = require("chalk")
const targets = require('./users.json')



async function run() {
  const { ethers, deployments } = hardhat
  const { provider, getContractAt, getContractFactory } = ethers
  const tokenAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
  const token = await getContractAt('ERC20', tokenAddress)

  // const sushiPool = "0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd"
  const binance = "0xf977814e90da44bfa03b6295a0616a897441acec"
  const before_bal = await token.balanceOf(binance);
  console.log('balance reamining in sending account:', before_bal.toString())

  await hardhat.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [binance]}
  );

  const sushiPoolSigner = await ethers.provider.getSigner(binance)


 // const targets = ['0xcc1194930B624b94f0365143c18645a329794366',  '0xF2FA73f9adEaDF3d6005d4f3E7890dd13476CaF6']
  const amountToSend = ethers.utils.parseEther('0.0001')
  for (let i = 0; i < targets.length; i++) {
    const tx = await token.connect(sushiPoolSigner).transfer(targets[i], amountToSend)
    console.log(chalk.dim(`Sending  token to ${targets[i]}...`))
    const rc = await tx.wait(1);
    const bal = await token.balanceOf(targets[i]);
    console.log('balance of ', bal.toString())
  }
}
run()
