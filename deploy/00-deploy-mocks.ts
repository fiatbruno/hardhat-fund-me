import { DeployFunction } from "hardhat-deploy/dist/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"

import {
    developmentChain,
    DECIMALS,
    INITIAL_ANSWER,
} from "../helper-hardhat-config"

const deployFundMe: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { deployments, getNamedAccounts, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId: number = network.config.chainId!

    if (developmentChain.includes(network.name)) {
        log("Local network detected! Deploying mocks...")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER],
        })
        log("Mocks Deployed!")
        log("---------------------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
module.exports.default = deployFundMe
