const SpaghettiCoin = artifacts.require('./SpaghettiCoin.sol')
const SpaghettiSale = artifacts.require('./SpaghettiSale.sol')
const colors = require('colors')

module.exports = (deployer, network, accounts) => {
    
    if(network === 'eidoo') {
        const wallet            = accounts[1]                                 // Where funds and token are stored
        const stagingKycSigners = [                                           // KYC Signers
            '0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef', 
            '0x890d4c6b94e6f54bdbb58530f425c2a5a3033361'
        ]                                    
        const openingTime       = web3.eth.getBlock('latest').timestamp       // Starts immediately
        const closingTime       = openingTime + 86400 * 20                    // Ends after 20 days
        const totalTokens       = 1000000*10**18                              // 1 mln of tokens
        const rate              = 5                                           // Multiplier 1 ether gives you back 5 token

        return deployer
            .then(() => {
                return deployer.deploy(SpaghettiCoin, totalTokens, {from: wallet})
            })
            .then((instance) => {
                SpaghettiCoinInst = instance
                console.log(colors.green(`\n[spaghetti coin address]: ${SpaghettiCoinInst.address}`))
                return deployer.deploy(
                    SpaghettiSale,
                    stagingKycSigners,
                    SpaghettiCoinInst.address,
                    wallet,
                    openingTime,
                    closingTime,
                    rate,
                    totalTokens,
                    {from: wallet}
                )
            })
            .then((instance) => {
                SpaghettiSaleInst = instance
                console.log(colors.green(`[spaghetti sale address]: ${SpaghettiSaleInst.address}`))
                return SpaghettiCoinInst.approve(SpaghettiSaleInst.address, totalTokens, {from: wallet});
            }).then((tx) => {
                console.log(colors.green(`[approval transaction status]: ${tx.receipt.status == '0x1' ? 'success' : 'fail'}`))
            })
    }
}
