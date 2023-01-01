import { ethers } from "hardhat"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
async function main() {
    const accounts = await ethers.getSigners()
    const deployer: SignerWithAddress = accounts[0]
    const fundMe = await ethers.getContract("FundMe", deployer)
    console.log("Withdrawing...")
    const transactionResponse = await fundMe.withdraw()
    await transactionResponse.wait(1)
    console.log("Got it back!")
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
