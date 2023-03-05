import  { combineReducers } from 'redux' ;

import cartReducer from './cart' ;
import nftReducer from './nft';

export default combineReducers({
    cart : cartReducer ,
    nft : nftReducer
});