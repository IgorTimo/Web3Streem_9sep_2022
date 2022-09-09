import { useState, useEffect } from "react";
import walletProvider from "../abi/walletProvider";

const Header = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLogOutVisible, setLogOutVisible] = useState(false);

  useEffect(() => {
    window.ethereum.on("accountsChanged", (accounts) => {
      console.log(accounts);
      setCurrentAccount(accounts[0]);
    });
    window.ethereum.on("chainChanged", (chainId) => {
      if (chainId !== "0x4") {
        setCurrentAccount("");
      }
    });

    return () => {
      window.ethereum.removeListener("accountsChanged");
      window.ethereum.removeListener("chainChanged");
    };
  }, []);

  const handleMetamaskConnect = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x4" }],
      });
      const accounts = await walletProvider.send("eth_requestAccounts", []);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header
      style={{
        display: "flex",
        position: "relative",
        justifyContent: "space-between",
        padding: "16px",
      }}
    >
      <h1>Slogan</h1>
      {currentAccount ? (
        <h1 onClick={() => setLogOutVisible(!isLogOutVisible)}>
          {currentAccount}
        </h1>
      ) : (
        <button onClick={handleMetamaskConnect}>Connect to metamask</button>
      )}
      {isLogOutVisible && (
        <div style={{ position: "absolute", right: "30px", top: "80px" }}>
          <button
            onClick={() => {
              setCurrentAccount("");
              setLogOutVisible(false);
            }}
          >
            Log out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
