import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"

import { assert, expect } from "chai"
import { BigNumber, ContractReceipt, ContractTransaction } from "ethers"
import { network, deployments, ethers } from "hardhat"
import { developmentChains } from "../../helper-hardhat-config"
import { FundMe, MockV3Aggregator } from "../../typechain-types"

describe("FundMe", async () => {
    let fundMe: FundMe
    let mockV3Aggregator: MockV3Aggregator
    let deployer: SignerWithAddress
    const sendValue: BigNumber = ethers.utils.parseEther("1")

    beforeEach(async () => {
        const accounts = await ethers.getSigners()
        deployer = accounts[0]

        await deployments.fixture(["all"])
        fundMe = await ethers.getContract("FundMe")
        mockV3Aggregator = await ethers.getContract("MockV3Aggregator")
    })
    describe("constructor", async () => {
        it("sets the aggregator address correctly", async () => {
            const response = await fundMe.priceFeed()
            assert.equal(response, mockV3Aggregator.address)
        })
    })
    // The logic for this test is: if the function is called we can see it using the typeof operator
    // If it's not called the typeof operator returns undefined.
    // The only problem is that it only proves that fund() is a function not that it's called
    describe("recieve & fallback", async () => {
        it("Should call fund() correctly", async () => {
            assert.equal(typeof fundMe.fund, "function")
        })
    })

    describe("fund", async () => {
        it("fails if you don't send enought ETH", async () => {
            await expect(fundMe.fund()).to.be.revertedWith(
                "You need to spend more ETH!"
            )
        })
        it("updates the amount funded data structure", async () => {
            await fundMe.fund({ value: sendValue })
            const response = await fundMe.addressToAmountFunded(
                deployer.address
            )
            assert.equal(response.toString(), sendValue.toString())
        })
        it("adds funder to array of funder", async () => {
            await fundMe.fund({ value: sendValue })
            const funder = await fundMe.funders(0)
            assert.equal(funder, deployer.address)
        })
    })

    describe("withdraw", async () => {
        beforeEach(async () => {
            await fundMe.fund({ value: sendValue })
        })

        it("withdraw ETH from a single founder", async () => {
            //arrange
            const startingFundMeBalance: BigNumber =
                await fundMe.provider.getBalance(fundMe.address)
            const startingDeployerBalance: BigNumber =
                await fundMe.provider.getBalance(deployer.address)
            //act
            const transactionResponse: ContractTransaction =
                await fundMe.withdraw()
            const transactionReceipt: ContractReceipt =
                await transactionResponse.wait(1)
            const { gasUsed, effectiveGasPrice } = transactionReceipt
            const gasCost: BigNumber = gasUsed.mul(effectiveGasPrice)
            const endingFundMeBalance: BigNumber =
                await fundMe.provider.getBalance(fundMe.address)
            const endingDeployerBalance: BigNumber =
                await fundMe.provider.getBalance(deployer.address)
            //assert
            assert.equal(endingFundMeBalance.toString(), "0")
            assert.equal(
                startingFundMeBalance.add(startingDeployerBalance).toString(),
                endingDeployerBalance.add(gasCost).toString()
            )
        })
    })
})
