import walletProvider from "../walletProvider";
import slogan from "./slogan";


const signer = walletProvider?.getSigner();
const sloganWithSigner = slogan.connect(signer);

export default sloganWithSigner;