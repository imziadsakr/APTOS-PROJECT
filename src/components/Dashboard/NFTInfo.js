import * as React from 'react';

import useWalletData  from 'src/shared/hooks/useWalletData';
import { loadAllCartList } from 'src/redux/actions/cart';
import { useDispatch } from 'react-redux';

import { Dialog, DialogContent } from '@mui/material';

import {
    NFTInfoMain,
    NFTImage,
    NFTName,
    NFTDesc,
    NFTOwner,
} from './styled/NFTInfo.styled';

import {
    StyledPaper,
    StyledButton
} from 'src/shared/styled';

import swal from 'sweetalert';

import { backend_endpoint, ipfs_origin } from 'src/utils/static';

import * as Wagmi from "wagmi";

import { nftAddr } from 'src/web3/addr';
import nftAbi from 'src/web3/abi/nft.json' ;
import axios from 'axios';
import { authorization, isAuthenticated } from 'src/utils/helper/globalHelper';

import Loading from 'react-loading-components';

const NFTInfo = (props) => {
    const {
        handleClose,
        open,
        nftInfo
    } = props;

    const {
        isConnected
    } = useWalletData() ;

    const dispatch = useDispatch();

    const {data: signer} = Wagmi.useSigner() ;

    const nftInstance = Wagmi.useContract({
		address: nftAddr,
		abi: nftAbi,
		signerOrProvider: signer,
	});

    const [nft_owner, setNFTOwner] = React.useState(null) ;
    const [loading, setLoading] = React.useState(null) ;

    const getOwnerOf = async () => {
        try {
            let owner = await nftInstance.ownerOf(nftInfo.id) ;
            setNFTOwner(owner);
        } catch(err) {
            setNFTOwner(null);
        }
    }

    const addToCart = async () => {
        setLoading(true) ;
        try {
            await axios.post(`${backend_endpoint}cart/addToCart`, {
                nft_id : nftInfo.id
            }, authorization()) ;

            swal({
                title : 'Success',
                text : `${nftInfo?.name} is added to cart`,
                buttons : {
                    confirm : {text : "Got it"}
                },
                icon: 'success'            
            })

            loadAllCartList(dispatch);
        } catch(err) {

        }

        setLoading(false) ;
        
        handleClose() ;
    }

    React.useEffect(() => {
        getOwnerOf();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nftInfo, signer]) ;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperComponent={StyledPaper}
            fullWidth
        >
            <DialogContent>
                <NFTInfoMain>
                    <NFTImage src={`${ipfs_origin}/${nftInfo?.asset}`} />
                    {/* <NFTOwner>Owner : {nft_owner || 'This is not minted yet.'}</NFTOwner> */}
                    <NFTName> Name : {nftInfo?.name}</NFTName>
                    <NFTDesc>Description : {nftInfo?.description}</NFTDesc>
                </NFTInfoMain>
                <div style={{marginTop: 20}} />
                <StyledButton fullWidth
                    disabled={!isAuthenticated() || loading}
                    onClick={() => addToCart()}
                >{loading && <Loading type='oval' width={20} height={20} fill="white" />} &nbsp; Add to Cart</StyledButton>
            </DialogContent>
        </Dialog>
        
    )
}

export default NFTInfo;