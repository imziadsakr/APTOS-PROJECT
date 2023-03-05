import * as React from 'react'

import * as Wagmi from 'wagmi' ;

const WalletContext = React.createContext()

export const WalletProvider = ({ children, value }) => {
    const {data: signer} = Wagmi.useSigner() ;

    const [isConnected, setIsConnected] = React.useState(false);
    const [userAddress, setUserAdderss] = React.useState('');

    const setWalletData = async (signer) => {
        if(signer) {
            let address = await signer.getAddress() ;
            setUserAdderss(address);
            setIsConnected(true);
            return ;
        }

        setUserAdderss('') ;
        setIsConnected(false) ;
    }

    React.useEffect(() => {
        setWalletData(signer) ;
        return ;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signer]) ;

    return (
        <WalletContext.Provider value={ {
            isConnected,
            userAddress
        } }>
        { children }
        </WalletContext.Provider>
    )
}

const useWalletData = () => {
    return React.useContext(WalletContext) ;
}

export default useWalletData;