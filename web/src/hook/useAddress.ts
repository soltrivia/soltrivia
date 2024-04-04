import { useWallet } from '@solana/wallet-adapter-react';

const useAddress = () => {
  const { publicKey } = useWallet();
  return publicKey ?  publicKey.toString():''
}


export default useAddress