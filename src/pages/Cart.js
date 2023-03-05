import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import useWalletData from 'src/shared/hooks/useWalletData';

import { backend_endpoint, ipfs_origin } from 'src/utils/static';

import {
    CartMain,
    NFTCard,
    NFTAsset,
    NFTName,
    NFTDesc,
    ButtonDiv
} from './styled/Cart.styled';

import NFTView from 'src/components/Cart/NFTView';
import Loading from 'react-loading-components';
import swal from 'sweetalert';

import axios from 'axios';
import { authorization } from 'src/utils/helper/globalHelper';
import ActionTypes from 'src/redux/actions/actionTypes';

import aptos_asset_list from 'src/shared/data/aptos_asset_list.json';
import { loadAllCartList, loadCartList } from 'src/redux/actions/cart';

const Cart = () => {
    const {
        isConnected
    } = useWalletData() ;

    const cartList = useSelector(state => state.cart.cartList) ;
    const dispatch = useDispatch() ;

    const [selectedNft, setSelectedNft] = React.useState(null) ;
    const [openNftView, setOpenNftView] = React.useState(false) ;

    const handleCloseNftView = () => { setOpenNftView(false) }
    const handleOpenNftView = () => { setOpenNftView(true) }


    const cancelCart = async (cart_id) => {
        await axios.delete(`${backend_endpoint}cart`, {
            ...authorization(),
            data : {
                cart_id
            }
        }, {
            'Access-Control-Allow-Origin' : '*',
        }) ;

        loadCartList(dispatch) ;
        loadAllCartList(dispatch) ;
    }

    const openViewNFTInfo = (nft, cart_id) => {
        setSelectedNft({
            ...nft,
            cart_id
        }) ;
        handleOpenNftView() ;
    }

    React.useEffect(() => {
        loadCartList(dispatch) ;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) ;

    return (
        <CartMain>
            {
                cartList ? cartList
                .map((cart, index) => (
                    <NFTCard key={index} >
                        <NFTAsset src={`${ipfs_origin}/${aptos_asset_list[cart.nft_id].asset}`}/>
                        <NFTName >
                            {aptos_asset_list[cart.nft_id].name}
                        </NFTName>
                        <NFTDesc >
                            {aptos_asset_list[cart.nft_id].description}
                        </NFTDesc>
                        <ButtonDiv>
                            <button type='button'
                                onClick={() => cancelCart(cart.id)}
                            >Remove From Cart</button>
                            <button onClick={() => 
                              openViewNFTInfo(aptos_asset_list[cart.nft_id], cart.id)
                            }>Purchase</button>
                        </ButtonDiv>
                    </NFTCard>
                )) : <Loading type='oval' width={30} height={30} />
            }
            <NFTView 
                open={openNftView}
                handleClose={handleCloseNftView}
                nftInfo={selectedNft}
                cancelCart={cancelCart}
            />
        </CartMain>
    )
}

export default Cart ;