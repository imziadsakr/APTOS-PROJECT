import ActionTypes from '../actions/actionTypes' ;

const INITIAL_STATE = {
    purchasedList : null,
    allPurchasedList : null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state=INITIAL_STATE , action={}) => {
    switch(action.type) {
        case ActionTypes.GetPurchasedList :
            return ({
                ...state , 
                purchasedList : action.payload.purchasedList
            }) ;
        case ActionTypes.GetAllPurchasedList :
            return ({
                ...state,
                allPurchasedList : action.payload.allPurchasedList
            })
        default :
            return state ; 
    }
}