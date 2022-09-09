import { ethers } from "ethers";
import defaultProvider from "../defaultProvider";




  const contractAddress = "0xBEB0DA7d96cd695034762772521505880a630543"; // process.env.sloganAddress
  const abi = [
    {
      inputs: [{ internalType: "string", name: "_slogan", type: "string" }],
      name: "setSlogan",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "slogans",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
  ];
  const slogan = new ethers.Contract(contractAddress, abi, defaultProvider);

  export default slogan;