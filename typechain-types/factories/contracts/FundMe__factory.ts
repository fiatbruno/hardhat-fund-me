/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { FundMe, FundMeInterface } from "../../contracts/FundMe";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "priceFeedAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "FundMe__NotOwner",
    type: "error",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "MINIMUM_USD",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "addressToAmountFunded",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fund",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "funders",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "iOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "priceFeed",
    outputs: [
      {
        internalType: "contract AggregatorV3Interface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x60a06040523480156200001157600080fd5b50604051620012eb380380620012eb833981810160405281019062000037919062000174565b6200005367811f6df69986ab8e60c01b6200010760201b60201c565b6200006f67843f8b55675ba12060c01b6200010760201b60201c565b3373ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1681525050620000bf670ce09eac47e7827a60c01b6200010760201b60201c565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050620001a6565b50565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200013c826200010f565b9050919050565b6200014e816200012f565b81146200015a57600080fd5b50565b6000815190506200016e8162000143565b92915050565b6000602082840312156200018d576200018c6200010a565b5b60006200019d848285016200015d565b91505092915050565b608051611122620001c960003960008181610428015261080701526111226000f3fe6080604052600436106100745760003560e01c8063741bef1a1161004e578063741bef1a1461015c57806377c9dd4b14610187578063b60d4288146101b2578063dc0d3dff146101bc57610097565b80633ccfd60b146100dd5780633e47d6f3146100f45780636b69a5921461013157610097565b366100975761008d67d36913943d456c3960c01b6101f9565b6100956101fc565b005b6100ab67fe9cd15133a0463260c01b6101f9565b6100bf67e3074558073c661860c01b6101f9565b6100d3678c99fd98f9ae252360c01b6101f9565b6100db6101fc565b005b3480156100e957600080fd5b506100f26103d6565b005b34801561010057600080fd5b5061011b60048036038101906101169190610b34565b6107ba565b6040516101289190610b7a565b60405180910390f35b34801561013d57600080fd5b506101466107d2565b6040516101539190610b7a565b60405180910390f35b34801561016857600080fd5b506101716107df565b60405161017e9190610bf4565b60405180910390f35b34801561019357600080fd5b5061019c610805565b6040516101a99190610c1e565b60405180910390f35b6101ba6101fc565b005b3480156101c857600080fd5b506101e360048036038101906101de9190610c65565b610829565b6040516101f09190610c1e565b60405180910390f35b50565b61021067aa637593c2a0e00160c01b6101f9565b6102246778cd5110a004b7bd60c01b6101f9565b61023867683652eae4702f4660c01b6101f9565b61024c67edbbd042ceda88f260c01b6101f9565b6802b5e3af16b188000061028b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff163461086890919063ffffffff16565b10156102cc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102c390610cef565b60405180910390fd5b6102e067d3cb23ffdee51d2a60c01b6101f9565b6102f4673bcdc439f8edabc260c01b6101f9565b346000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546103429190610d3e565b9250508190555061035d67a5007a6de39baa9d60c01b6101f9565b610371679ec950ee1b463e3d60c01b6101f9565b6001339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6103ea67ca0217d401f84f4760c01b6101f9565b6103fe6764ec88af8ed8f0da60c01b6101f9565b610412671f3218b76c3c59ef60c01b6101f9565b610426672f14a7a939c49bba60c01b6101f9565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146104bf5761048d673af131992365e87160c01b6101f9565b6040517f579610db00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6104d367d5a5a5f9d9fa6a5260c01b6101f9565b6104e7673bfb89e3dc8dd7fa60c01b6101f9565b6104fb67ac81f17bd475d23d60c01b6101f9565b61050f6764b9667eb168575260c01b6101f9565b61052367475f168a0783c9fc60c01b6101f9565b61053767f02235bf56e0feba60c01b6101f9565b60005b60018054905081101561061e5761055b67eec4e99748a04f4660c01b6101f9565b61056f671008a6973867558160c01b6101f9565b60006001828154811061058557610584610d72565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690506105c667c818dad44a508a4b60c01b6101f9565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555050808061061690610da1565b91505061053a565b50610633675f3d8c68f80e1bcc60c01b6101f9565b600067ffffffffffffffff81111561064e5761064d610de9565b5b60405190808252806020026020018201604052801561067c5781602001602082028036833780820191505090505b5060019080519060200190610692929190610a2a565b506106a7673bd2393f3488c91f60c01b6101f9565b6106bb67203801e44a7087ce60c01b6101f9565b60003373ffffffffffffffffffffffffffffffffffffffff16476040516106e190610e49565b60006040518083038185875af1925050503d806000811461071e576040519150601f19603f3d011682016040523d82523d6000602084013e610723565b606091505b5050905061073b678523c22feee5a5af60c01b6101f9565b61074f673431669e0604bbee60c01b6101f9565b6107636780dd1abe25ba637d60c01b6101f9565b806107a3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161079a90610eaa565b60405180910390fd5b6107b76792ffe50f70a8cbe460c01b6101f9565b50565b60006020528060005260406000206000915090505481565b6802b5e3af16b188000081565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b7f000000000000000000000000000000000000000000000000000000000000000081565b6001818154811061083957600080fd5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600061087e672cad25e459e95d0660c01b610931565b61089267df7b9cdfa772de0060c01b610931565b6108a6674313104ffb0a189d60c01b610931565b60006108b183610934565b90506108c767cf1bd5b1cf9ef5a660c01b610931565b6108db679b4e9e7b60eafef560c01b610931565b6000670de0b6b3a764000085836108f29190610eca565b6108fc9190610f3b565b9050610912675a3ea38206c41a1e60c01b610931565b6109266709d6543ce26e2d0c60c01b610931565b809250505092915050565b50565b600061094a676c4e93cf9d31e33f60c01b610931565b61095e671230743f0ac72a3a60c01b610931565b61097267f7b80873df671bd360c01b610931565b60008273ffffffffffffffffffffffffffffffffffffffff1663feaf968c6040518163ffffffff1660e01b815260040160a060405180830381865afa1580156109bf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109e39190610ff9565b5050509150506109fd6736ca11e06d3a893360c01b610931565b610a1167bbf90d75416e573760c01b610931565b6402540be40081610a229190611074565b915050919050565b828054828255906000526020600020908101928215610aa3579160200282015b82811115610aa25782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555091602001919060010190610a4a565b5b509050610ab09190610ab4565b5090565b5b80821115610acd576000816000905550600101610ab5565b5090565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610b0182610ad6565b9050919050565b610b1181610af6565b8114610b1c57600080fd5b50565b600081359050610b2e81610b08565b92915050565b600060208284031215610b4a57610b49610ad1565b5b6000610b5884828501610b1f565b91505092915050565b6000819050919050565b610b7481610b61565b82525050565b6000602082019050610b8f6000830184610b6b565b92915050565b6000819050919050565b6000610bba610bb5610bb084610ad6565b610b95565b610ad6565b9050919050565b6000610bcc82610b9f565b9050919050565b6000610bde82610bc1565b9050919050565b610bee81610bd3565b82525050565b6000602082019050610c096000830184610be5565b92915050565b610c1881610af6565b82525050565b6000602082019050610c336000830184610c0f565b92915050565b610c4281610b61565b8114610c4d57600080fd5b50565b600081359050610c5f81610c39565b92915050565b600060208284031215610c7b57610c7a610ad1565b5b6000610c8984828501610c50565b91505092915050565b600082825260208201905092915050565b7f596f75206e65656420746f207370656e64206d6f726520455448210000000000600082015250565b6000610cd9601b83610c92565b9150610ce482610ca3565b602082019050919050565b60006020820190508181036000830152610d0881610ccc565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610d4982610b61565b9150610d5483610b61565b9250828201905080821115610d6c57610d6b610d0f565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000610dac82610b61565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610dde57610ddd610d0f565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600081905092915050565b50565b6000610e33600083610e18565b9150610e3e82610e23565b600082019050919050565b6000610e5482610e26565b9150819050919050565b7f43616c6c206661696c6564000000000000000000000000000000000000000000600082015250565b6000610e94600b83610c92565b9150610e9f82610e5e565b602082019050919050565b60006020820190508181036000830152610ec381610e87565b9050919050565b6000610ed582610b61565b9150610ee083610b61565b9250828202610eee81610b61565b91508282048414831517610f0557610f04610d0f565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000610f4682610b61565b9150610f5183610b61565b925082610f6157610f60610f0c565b5b828204905092915050565b600069ffffffffffffffffffff82169050919050565b610f8b81610f6c565b8114610f9657600080fd5b50565b600081519050610fa881610f82565b92915050565b6000819050919050565b610fc181610fae565b8114610fcc57600080fd5b50565b600081519050610fde81610fb8565b92915050565b600081519050610ff381610c39565b92915050565b600080600080600060a0868803121561101557611014610ad1565b5b600061102388828901610f99565b955050602061103488828901610fcf565b945050604061104588828901610fe4565b935050606061105688828901610fe4565b925050608061106788828901610f99565b9150509295509295909350565b600061107f82610fae565b915061108a83610fae565b925082820261109881610fae565b91507f800000000000000000000000000000000000000000000000000000000000000084146000841216156110d0576110cf610d0f565b5b82820584148315176110e5576110e4610d0f565b5b509291505056fea2646970667358221220d3dddd23480df1c9f9172e0b6ae09174b5e87deb4893fc0ef89152108fed43c164736f6c63430008110033";

type FundMeConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FundMeConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FundMe__factory extends ContractFactory {
  constructor(...args: FundMeConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    priceFeedAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<FundMe> {
    return super.deploy(priceFeedAddress, overrides || {}) as Promise<FundMe>;
  }
  override getDeployTransaction(
    priceFeedAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(priceFeedAddress, overrides || {});
  }
  override attach(address: string): FundMe {
    return super.attach(address) as FundMe;
  }
  override connect(signer: Signer): FundMe__factory {
    return super.connect(signer) as FundMe__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FundMeInterface {
    return new utils.Interface(_abi) as FundMeInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): FundMe {
    return new Contract(address, _abi, signerOrProvider) as FundMe;
  }
}
