import { ethers } from "ethers";
import { useState } from "react";
import slogan from "./abi/slogan/slogan";
import sloganWithSigner from "./abi/slogan/sloganWithSigner";
import Header from "./componets/Header";

const Index = () => {
  const [address, setAddress] = useState("");
  const [newSlogan, setNewSlogan] = useState("");
  const [sloganText, setSloganText] = useState("Print address to find slogan");

  

//   

//   const contractWithSigner = contractSlogan.connect(signer);



  const handleSearchSlogan = async (e) => {
    e.preventDefault();
    try {
      const sloganText = await slogan.slogans(address);
      setSloganText(sloganText || "no slogans");
    } catch (error) {
      setSloganText("Something went wrong ... ");
      console.error(error);
    }
  };

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleSetSlogan = async (e) => {
    e.preventDefault();
    try {
      const tx = await sloganWithSigner.setSlogan(newSlogan);
      console.log("tx: ", tx);
      const response = await tx.wait();
      console.log("response: ", response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
    <Header/>
      <form onSubmit={handleSearchSlogan}>
        <input
          onChange={handleChangeAddress}
          value={address}
          placeholder="Enter address"
        />
        <button type="submit">Search slogan</button>
      </form>
      <br />
      <p>{sloganText}</p>
      <form onSubmit={handleSetSlogan}>
        <input
          onChange={(e) => setNewSlogan(e.target.value)}
          value={newSlogan}
          placeholder="Enter slogan"
        />
        <button type="submit">Set slogan</button>
      </form>
      <br />
    </div>
  );
};

export default Index;
