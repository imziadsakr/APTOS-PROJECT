import * as React from 'react' ;

import { useNavigate } from 'react-router-dom';
import useWalletData from 'src/shared/hooks/useWalletData';
import useRouteData from 'src/shared/hooks/useRouteData';

import { 
    MintMain
} from './styled/Mint.styled';

import { routeData } from 'src/utils/routeData';

import swal from 'sweetalert';

import * as Wagmi from "wagmi";

import { marketplaceAddr } from 'src/web3/addr';
import marketplaceAbi from 'src/web3/abi/marketplace.json' ;
import MintNow from 'src/components/Mint/MintNow';

let timer ;

const Mint = () => {
    const dashboardRoute = {
        ...routeData.dashboard,
        childrens : [routeData.dashboard.key],
        navLabel : routeData.dashboard.label,
    };

    const {
        onChangeRoute
    } = useRouteData() ;

    const {
        isConnected
    } = useWalletData() ;

    const navigate = useNavigate() ;

    const {data: signer} = Wagmi.useSigner() ;

    const nftInstance = Wagmi.useContract({
		address: marketplaceAddr,
		abi: marketplaceAbi,
		signerOrProvider: signer,
	});

    React.useEffect(() => {
        if(!isConnected) {
            swal({
                title : 'Information',
                text : 'You should connect wallet to mint NFT',
                buttons : {
                    confirm : {text  : 'Got it'}
                },
                icon : 'info'
            }) ;

            onChangeRoute(dashboardRoute);
            navigate('/dashboard');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected]);

    const mintAllAsset = async () => {
        try {
            await nftInstance.mint(100) ;
        } catch(err) {
            console.log(err) ;
        }
    }

    React.useEffect(() => {
        return () => {
            clearInterval(timer) ;
        }
    }, []);

    return (
        <MintMain>
            <MintNow />
        </MintMain>
    )
}

export default Mint ;