import ActionTypes from '../actions/actionTypes' ;

const INITIAL_STATE = {
    allCartList : null,
    cartList : null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state=INITIAL_STATE , action={}) => {
    switch(action.type) {
        case ActionTypes.GetAllCartList :
            return ({
                ...state , 
                allCartList : action.payload.allCartList
            }) ;
        case ActionTypes.GetCartList :
            return ({
                ...state , 
                cartList : action.payload.cartList
            }) ;
        default :
            return state ; 
    }
}