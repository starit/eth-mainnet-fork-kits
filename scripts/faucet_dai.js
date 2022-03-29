const hardhat = require('hardhat')
const chalk = require("chalk")
const targets = require('./users.json')



async function run() {
  const { ethers, deployments } = hardhat
  const { provider, getContractAt, getContractFactory } = ethers
  // const sushiPool = await ethers.provider.getUncheckedSigner('0x397ff1542f962076d0bfe58ea045ffa2d347aca0')
  console.log('run here 1')
  const daiAddress = '0x6b175474e89094c44da98b954eedeac495271d0f'
  const dai = await getContractAt('ERC20', daiAddress)

  // const sushiPool = "0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd"
  const binance = "0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0"
  const before_bal = await dai.balanceOf(binance);
  console.log('balance reamining in sending account:', before_bal.toString())

  await hardhat.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [binance]}
  );

  const sushiPoolSigner = await ethers.provider.getSigner(binance)


  // const targets = ['0xcc1194930B624b94f0365143c18645a329794366']
  const amountToSend = ethers.utils.parseEther('100000')
  for (let i = 0; i < targets.length; i++) {
    const tx = await dai.connect(sushiPoolSigner).transfer(targets[i], amountToSend)
    console.log(chalk.dim(`Sending  dai to ${targets[i]}...`))
    const rc = await tx.wait(1);
    const bal = await dai.balanceOf(targets[i]);
    console.log('balance of ', bal.toString())
  }
}
run()
