import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { assert, expect } from "chai"
import { BigNumber, ContractReceipt, ContractTransaction } from "ethers"
import { network, deployments, ethers } from "hardhat"
import { developmentChains } from "../../helper-hardhat-config"
import { FundMe, MockV3Aggregator } from "../../typechain-types"

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async () => {
          let fundMe: FundMe
          let mockV3Aggregator: MockV3Aggregator
          let deployer: SignerWithAddress
          const sendValue: BigNumber = ethers.utils.parseEther("0.01")

          before(async () => {
              if (!developmentChains.includes(network.name)) {
                  throw "You need to be on a development chain to run tests"
              }
              const accounts = await ethers.getSigners()
              deployer = accounts[0]
              deployments.fixture(["all"])
              fundMe = await ethers.getContract("FundMe", deployer)
              mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer)
          })
          describe("constructor", async () => {
              it("sets the aggregator address correctly", async () => {
                  const response = await fundMe.getPriceFeed()
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
                  const response = await fundMe.getAddressToAmountFunded(
                      deployer.address
                  )
                  assert.equal(response.toString(), sendValue.toString())
              })
              it("adds funder to array of funder", async () => {
                  await fundMe.fund({ value: sendValue })
                  const funder = await fundMe.getFunder(0)
                  assert.equal(funder, deployer.address)
              })
          })

          describe("withdraw", async () => {
              beforeEach(async () => {
                  await fundMe.fund({ value: sendValue })
              })

              it("withdraw ETH from a single funder", async () => {
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
                      startingFundMeBalance
                          .add(startingDeployerBalance)
                          .toString(),
                      endingDeployerBalance.add(gasCost).toString()
                  )
              })
              it("is allows us to withdraw with multiple funders", async () => {
                  // Arrange
                  const accounts = await ethers.getSigners()
                  for (let i = 0; i < 6; i++) {
                      await fundMe
                          .connect(accounts[i])
                          .fund({ value: sendValue })
                  }
                  //Act
                  const startingFundMeBalance =
                      await fundMe.provider.getBalance(fundMe.address)
                  const startingDeployerBalance =
                      await fundMe.provider.getBalance(deployer.address)
                  const transactionResponse = await fundMe.withdraw()
                  const transactionReceipt = await transactionResponse.wait(1)
                  const { gasUsed, effectiveGasPrice } = transactionReceipt
                  const withdrawGasCost = gasUsed.mul(effectiveGasPrice)
                  console.log(`GasCost: ${withdrawGasCost}`)
                  console.log(`GasUsed: ${gasUsed}`)
                  console.log(`GasPrice: ${effectiveGasPrice}`)
                  const endingFundMeBalance = await fundMe.provider.getBalance(
                      fundMe.address
                  )
                  const endingDeployerBalance =
                      await fundMe.provider.getBalance(deployer.address)
                  // Assert
                  assert.equal(endingFundMeBalance.toString(), "0")
                  assert.equal(
                      startingFundMeBalance
                          .add(startingDeployerBalance)
                          .toString(),
                      endingDeployerBalance.add(withdrawGasCost).toString()
                  )
                  await expect(fundMe.getFunder(0)).to.be.reverted
                  for (let j = 0; j < 6; j++) {
                      assert.equal(
                          (
                              await fundMe.getAddressToAmountFunded(
                                  accounts[j].address
                              )
                          ).toString(),
                          "0"
                      )
                  }
              })
              it("only allows owner to withdraw", async () => {
                  const accounts = await ethers.getSigners()
                  const attacker = accounts[1]
                  const attackerContractConnected = await fundMe.connect(
                      attacker
                  )
                  expect(
                      attackerContractConnected.withdraw()
                  ).to.be.revertedWith("FundMe__NotOwner")
              })
              it("cheaperWithdraw testing... ", async () => {
                  // Arrange
                  const accounts = await ethers.getSigners()
                  for (let i = 0; i < 6; i++) {
                      await fundMe
                          .connect(accounts[i])
                          .fund({ value: sendValue })
                  }
                  //Act
                  const startingFundMeBalance =
                      await fundMe.provider.getBalance(fundMe.address)
                  const startingDeployerBalance =
                      await fundMe.provider.getBalance(deployer.address)
                  const transactionResponse = await fundMe.cheaperWithdraw()
                  const transactionReceipt = await transactionResponse.wait(1)
                  const { gasUsed, effectiveGasPrice } = transactionReceipt
                  const withdrawGasCost = gasUsed.mul(effectiveGasPrice)
                  console.log(`GasCost: ${withdrawGasCost}`)
                  console.log(`GasUsed: ${gasUsed}`)
                  console.log(`GasPrice: ${effectiveGasPrice}`)
                  const endingFundMeBalance = await fundMe.provider.getBalance(
                      fundMe.address
                  )
                  const endingDeployerBalance =
                      await fundMe.provider.getBalance(deployer.address)
                  // Assert
                  assert.equal(endingFundMeBalance.toString(), "0")
                  assert.equal(
                      startingFundMeBalance
                          .add(startingDeployerBalance)
                          .toString(),
                      endingDeployerBalance.add(withdrawGasCost).toString()
                  )
                  await expect(fundMe.getFunder(0)).to.be.reverted
                  for (let j = 0; j < 6; j++) {
                      assert.equal(
                          (
                              await fundMe.getAddressToAmountFunded(
                                  accounts[j].address
                              )
                          ).toString(),
                          "0"
                      )
                  }
              })
              it("cheaperWithdraw testing...", async () => {
                  //arrange
                  const startingFundMeBalance: BigNumber =
                      await fundMe.provider.getBalance(fundMe.address)
                  const startingDeployerBalance: BigNumber =
                      await fundMe.provider.getBalance(deployer.address)
                  //act
                  const transactionResponse: ContractTransaction =
                      await fundMe.cheaperWithdraw()
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
                      startingFundMeBalance
                          .add(startingDeployerBalance)
                          .toString(),
                      endingDeployerBalance.add(gasCost).toString()
                  )
              })
          })
      })
