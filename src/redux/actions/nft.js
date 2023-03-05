import axios from "axios";
import { backend_endpoint } from "src/utils/static";
import { authorization } from "src/utils/helper/globalHelper";
import ActionTypes from "./actionTypes";

export const loadAllPurchasedList = async (dispatch) => {
    let res = await axios.get(`${backend_endpoint}nft/`, authorization()) ;

    console.log(res.data);

    dispatch({
        type : ActionTypes.GetAllPurchasedList,
        payload : {
            allPurchasedList : res.data.allPurchasedList
        }
    });
}
export const loadPurchasedList = async (dispatch) => {
    let res = await axios.get(`${backend_endpoint}nft/purchasedList`, authorization()) ;

    console.log(res.data) ;

    dispatch({
        type : ActionTypes.GetPurchasedList,
        payload : {
            purchasedList : res.data.purchasedList
        }
    }) ;
}