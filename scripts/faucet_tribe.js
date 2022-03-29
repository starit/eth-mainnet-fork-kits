const hardhat = require('hardhat')
const chalk = require("chalk")
const users = require('./users.json')
const targets = users

const tokenAddress = '0xc7283b66eb1eb5fb86327f08e1b5816b0720212b'
const whaleAddress = '0x0d0707963952f2fba59dd06f2b425ace40b492fe' //

async function run() {
  const { ethers, deployments } = hardhat
  const { provider, getContractAt, getContractFactory } = ethers
  const token = await getContractAt('ERC20', tokenAddress)

  const amountToSend = ethers.utils.parseEther('20000')

  const before_bal = await token.balanceOf(whaleAddress);
  console.log('balance reamining in sending account:', before_bal.toString())

  await hardhat.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [whaleAddress]}
  );

  const sushiPoolSigner = await ethers.provider.getSigner(whaleAddress)


  const targets = ['0xcc1194930B624b94f0365143c18645a329794366', '0x72fEcb8D12350B48bDee9fEEf5282e009F832155']
  for (let i = 0; i < targets.length; i++) {
    const tx = await token.connect(sushiPoolSigner).transfer(targets[i], amountToSend)
    console.log(chalk.dim(`Sending  token to ${targets[i]}...`))
    const rc = await tx.wait(1);
    const bal = await token.balanceOf(targets[i]);
    console.log('balance of ', bal.toString())
  }
}
run()
