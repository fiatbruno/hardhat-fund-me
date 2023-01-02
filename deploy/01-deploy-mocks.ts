import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"

const DECIMALS = "8"
const INITIAL_ANSWER = "200000000000"

const deployMocks: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { deployments, getNamedAccounts, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId: number = network.config.chainId!

    // If we are on a local development network, we need to deploy mocks!

    if (chainId == 31337) {
        log("Local network detected! Deploying mocks...")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER],
        })
        log("Mocks Deployed!")
        log(
            "You are deploying to a local network, you'll need a local network running to interact"
        )
        log(
            "Please run `yarn hardhat console` to interact with the deployed smart contracts!"
        )
        log("----------------------------------------------------")
    }
}

export default deployMocks
deployMocks.tags = ["all", "mocks"]
