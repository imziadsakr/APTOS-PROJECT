import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import useWalletData from 'src/shared/hooks/useWalletData';


import {
    PurchasedMain,
    NFTCard,
    NFTAsset,
    NFTName,
    NFTDesc,
    ButtonDiv
} from './styled/Purchased.styled';

import NFTView from 'src/components/Purchased/NFTView';
import Loading from 'react-loading-components';
import swal from 'sweetalert';

import aptos_asset_list from 'src/shared/data/aptos_asset_list.json';
import { ipfs_origin } from 'src/utils/static';

import { loadPurchasedList } from 'src/redux/actions/nft';

const Purchased = () => {
    const {
        isConnected
    } = useWalletData() ;

    const purchasedList = useSelector(state => state.nft.purchasedList) ;
    const dispatch = useDispatch() ;

    const [selectedNft, setSelectedNft] = React.useState(null) ;
    const [openNftView, setOpenNftView] = React.useState(false) ;

    const handleCloseNftView = () => { setOpenNftView(false) }
    const handleOpenNftView = () => { setOpenNftView(true) }

    const openViewNFTInfo = (nft, purchased_id) => {
        if(!isConnected) {
            return swal({
                title : 'Warning',
                text : 'You should connect wallet for transfer',
                buttons : {
                    confirm : { text : 'Got it'}
                },
                icon : 'warning'
            })
        }
        setSelectedNft({
            ...nft,
            purchased_id
        }) ;
        handleOpenNftView() ;
    }

    React.useEffect(() => {
        loadPurchasedList(dispatch) ;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) ;

    return (
        <PurchasedMain>
            {
                purchasedList ? purchasedList
                .map((nft, index) => (
                    <NFTCard key={index} >
                        <NFTAsset src={`${ipfs_origin}/${aptos_asset_list[nft.nft_id].asset}`}/>
                        <NFTName >
                            {aptos_asset_list[nft.nft_id].name}
                        </NFTName>
                        <NFTDesc >
                            {aptos_asset_list[nft.nft_id].description}
                        </NFTDesc>
                        <ButtonDiv>
                            <button onClick={() => 
                              openViewNFTInfo(aptos_asset_list[nft.nft_id], nft.id)
                            }>Transfer</button>
                        </ButtonDiv>
                    </NFTCard>
                )) : <Loading type='oval' width={30} height={30} />
            }
            <NFTView 
                open={openNftView}
                handleClose={handleCloseNftView}
                nftInfo={selectedNft}
            />
        </PurchasedMain>
    )
}

export default Purchased ;