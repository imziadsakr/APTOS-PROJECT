import * as React from 'react';

import { useDispatch } from 'react-redux';

import { Dialog, DialogContent } from '@mui/material';

import {
    NFTViewMain,
    NFTImage,
    NFTName,
    NFTDesc,
    NFTOwner,
} from './styled/NFTView.styled';

import {
    StyledPaper,
    StyledTextField,
} from 'src/shared/styled';

import swal from 'sweetalert';

import { backend_endpoint, ipfs_origin } from 'src/utils/static';
import Checkout from 'src/shared/components/Checkout';

import * as Wagmi from "wagmi";

import { nftAddr } from 'src/web3/addr';
import nftAbi from 'src/web3/abi/nft.json' ;
import axios from 'axios';
import { authorization } from 'src/utils/helper/globalHelper';
import { loadAllCartList, loadCartList } from 'src/redux/actions/cart';
import { loadAllPurchasedList, loadPurchasedList } from 'src/redux/actions/nft';

const NFTView = (props) => {
    const {
        handleClose,
        open,
        nftInfo,
        cancelCart
    } = props;
    
    const {data: signer} = Wagmi.useSigner() ;

    const nftInstance = Wagmi.useContract({
		address: nftAddr,
		abi: nftAbi,
		signerOrProvider: signer,
	});

    const dispatch = useDispatch() ;

    const [buyer_address, setBuyerAddress] = React.useState('');
    const [nft_owner, setNFTOwner] = React.useState(null) ;

    const getOwnerOf = async () => {
        try {
            let owner = await nftInstance.ownerOf(nftInfo.id) ;
            setNFTOwner(owner);
        } catch(err) {
            setNFTOwner(null);
        }
    }

    const purchaseAsset = async () => {
        try {
            let res = await axios.post(`${backend_endpoint}nft/purchaseAsset`, {
                nft_id : nftInfo.id,
            }, authorization());

            await cancelCart(nftInfo.cart_id);
            
            loadCartList(dispatch) ;

            swal({
                title : 'Success',
                text : `${nftInfo?.name} is purchased`,
                buttons : {
                    confirm : {text : "Got it"}
                },
                icon: 'success'            
            })

            console.log(res.data) ;

        } catch(err) {

        }

        handleClose() ;
    }
    React.useEffect(() => {
        if(nftInfo) getOwnerOf();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nftInfo]) ;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperComponent={StyledPaper}
            fullWidth
        >
            <DialogContent>
                <NFTViewMain>
                    <NFTImage src={`${ipfs_origin}/${nftInfo?.asset}`} />
                    {/* <NFTOwner>Owner : {nft_owner || 'This is not minted yet.'}</NFTOwner> */}
                    <NFTName> Name : {nftInfo?.name}</NFTName>
                    <NFTDesc>Description : {nftInfo?.description}</NFTDesc>
                </NFTViewMain>
                <div style={{marginTop : 10}} />
                { <Checkout 
                    payEvent={purchaseAsset}
                /> }
                <div style={{marginTop : 20}} />
            </DialogContent>
        </Dialog>
        
    )
}

export default NFTView;