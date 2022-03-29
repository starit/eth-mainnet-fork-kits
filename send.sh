#!/bin/bash
# npx hardhat run scripts/faucet_crvRenWBTC.js --network localhost
# npx hardhat run scripts/faucet_eCRV.js --network localhost
# npx hardhat run scripts/faucet_hCRV.js --network localhost
# npx hardhat run scripts/faucet_threeCRV.js --network localhost
#

# npx hardhat run scripts/faucet_slpETHUSDC.js --network localhost
# npx hardhat run scripts/faucet_slpETHWBTC.js --network localhost
# npx hardhat run scripts/faucet_slpETHDai.js  --network localhost
# npx hardhat run scripts/faucet_slpETHUSDT.js --network localhost

symbols=('usdc' 'dai' 'usdt' 'weth' 'wbtc' 'slpETHWBTC')

echo 'symbols:'${symbols[*]}
echo '----'
for symbol in "${symbols[@]}"
do
  echo 'symbol:'${symbol}
  npx hardhat run scripts/faucet_${symbol}.js --network hardhat
done
