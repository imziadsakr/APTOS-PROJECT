import * as React from 'react';

import useWalletData from 'src/shared/hooks/useWalletData';
import { useDispatch } from 'react-redux';

import { Dialog, DialogContent } from '@mui/material';

import validator from 'validator';

import {
    NFTViewMain,
    NFTImage,
    NFTName,
    NFTDesc,
    NFTOwner,
} from './styled/NFTView.styled';

import {
    StyledButton,
    StyledPaper,
    StyledTextField,
} from 'src/shared/styled';

import Loading from 'react-loading-components';
import swal from 'sweetalert';

import { backend_endpoint, ipfs_origin } from 'src/utils/static';

import * as Wagmi from "wagmi";

import { nftAddr } from 'src/web3/addr';
import nftAbi from 'src/web3/abi/nft.json' ;
import axios from 'axios';
import { authorization } from 'src/utils/helper/globalHelper';
import { withdraw } from 'src/web3/markeplace';
import { loadPurchasedList } from 'src/redux/actions/nft';

const NFTView = (props) => {
    const {
        handleClose,
        open,
        nftInfo,
        cancelCart
    } = props;
    
    const {
        isConnected
    } = useWalletData() ;

    const dispatch = useDispatch() ;

    const {data: signer} = Wagmi.useSigner() ;

    const nftInstance = Wagmi.useContract({
		address: nftAddr,
		abi: nftAbi,
		signerOrProvider: signer,
	});

    const [loading, setLoading] = React.useState(false) ;
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

    const withdrawNft = async () => {
        setLoading(true) ;

        try {
            let txResult = await withdraw(buyer_address, nftInfo.id) ;

            if(txResult) {
                let res = await axios.post(`${backend_endpoint}nft/withdrawNft`, {
                    purchased_id : nftInfo.purchased_id
                }, authorization()) ;

                console.log(res.data) ;

                loadPurchasedList(dispatch);
                
                swal({
                    title : 'Success',
                    text : 'Transfer is successful',
                    buttons : {
                        confirm : {text : 'Got it'}
                    },
                    icon : 'success'
                });
            } else {
                swal({
                    title : 'Error',
                    text : 'Transfer is not successful',
                    buttons : {
                        confirm : {text: 'Got it'}
                    },
                    icon : 'error'
                })
            }
        } catch(err) {
            console.log(err);
            swal({
                title : 'Error',
                text : 'Transfer is not successful',
                buttons : {
                    confirm : {text: 'Got it'}
                },
                icon : 'error'
            })
        }

        handleClose();

        setLoading(false) ;
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
        >
            <DialogContent>
                <NFTViewMain>
                    <NFTImage src={`${ipfs_origin}/${nftInfo?.asset}`} />
                    {/* <NFTOwner>Owner : {nft_owner || 'This is not minted yet.'}</NFTOwner> */}
                    <NFTName> Name : {nftInfo?.name}</NFTName>
                    <NFTDesc>Description : {nftInfo?.description}</NFTDesc>
                </NFTViewMain>
                <div style={{marginTop : 20}} />
                <StyledTextField 
                    fullWidth
                    value={buyer_address}
                    onChange={(e) => setBuyerAddress(e.target.value)}
                />
                <div style={{marginTop : 20}} />
                <StyledButton onClick={withdrawNft}
                    fullWidth
                    disabled={
                        !validator.isEthereumAddress(buyer_address)
                        || loading
                        || !isConnected
                    }
                    startIcon={loading && <Loading type='oval' width={20} height={20} fill='white'/>}
                >
                    Withdraw
                </StyledButton>
            </DialogContent>
        </Dialog>
        
    )
}

export default NFTView;