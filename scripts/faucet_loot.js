const hardhat = require('hardhat')
const chalk = require("chalk")
const users = require('./users.json')
// const targets = users

const tokenAddress = '0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7'
const whaleAddress = '0x9726041047644626468922598128349778349982' //312

async function run() {
  const { ethers, deployments } = hardhat
  const { provider, getContractAt, getContractFactory } = ethers
  const token = await getContractAt('ERC721', tokenAddress)

  const targets = ['0xb0d133a568992e7F53f94D5E1f2d733b80Ee3A5F']
  const tokenIdsToSend = [ 2072, 2074, 2079]
  // const tokenIdsToSend = [2067, 2068, 2072, 2074, 2079]

  const before_bal = await token.balanceOf(whaleAddress);
  console.log('balance reamining in sending account:', before_bal.toString())

  await hardhat.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [whaleAddress]}
  );

  const signer = await ethers.provider.getSigner(whaleAddress)

  for (let i = 0; i < targets.length; i++) {
    const tx = await token.connect(signer)["safeTransferFrom(address,address,uint256)"](whaleAddress, targets[i], tokenIdsToSend[i])
    console.log(chalk.dim(`Sending  token to ${targets[i]}...`))
    const rc = await tx.wait(1);
    const bal = await token.balanceOf(targets[i]);
    console.log('balance of ', bal.toString())
  }
}
run()
