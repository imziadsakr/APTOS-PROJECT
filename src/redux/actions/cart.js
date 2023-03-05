import ActionTypes from './actionTypes';

import axios from 'axios';
import { backend_endpoint } from 'src/utils/static';

import { authorization } from 'src/utils/helper/globalHelper';

export const loadAllCartList = async (dispatch) => {
    let res = await axios.get(`${backend_endpoint}cart/`, authorization()) ;

    console.log(res.data);

    dispatch({
        type : ActionTypes.GetAllCartList,
        payload : {
            allCartList : res.data.allCartList
        }
    });
}


export const loadCartList = async (dispatch) => {
    let res = await axios.get(`${backend_endpoint}cart/cartList`, authorization()) ;

    dispatch({
        type : ActionTypes.GetCartList,
        payload : {
            cartList : res.data.cartList
        }
    }) ;
}