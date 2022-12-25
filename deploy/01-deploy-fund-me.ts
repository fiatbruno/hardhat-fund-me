import { DeployFunction } from "hardhat-deploy/dist/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"

const { networkConfig } = require("../helper-hardhat-config")

const deployFundMe: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { deployments, getNamedAccounts, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId: number = network.config.chainId!

    const priceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"] 

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [], // Put priceFeedAddress here
        log: true,
    })
}
