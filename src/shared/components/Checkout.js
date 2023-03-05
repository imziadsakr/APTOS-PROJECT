import * as React from 'react';

import tagStyled from 'styled-components';

import Loading from 'react-loading-components' ;

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

import {
    Select,
    FormControl,
    MenuItem
} from '@mui/material';

import {
    makeStyles
} from '@mui/styles';

const Checkout = (props) => {
    const classes = useStyles() ;

    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [currency, setCurrency] = React.useState(options.currency);

    const onCurrencyChange = (currency) => {
        setCurrency(currency);
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }

    const onCreateOrder = (data,actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: "8.99",
                    },
                },
            ],
        });
    }

    const onApproveOrder = (data,actions) => {
        return actions.order.capture().then((details) => {
            // const name = details.payer.name.given_name;
            props.payEvent() ;
        });
    }

    return (
        <CheckoutMain>
            {isPending ? <LoadingDiv>
                <Loading type='oval' width={40} height={40} fill={'white'} />
            </LoadingDiv> : (
                <>
                    <FormControl fullWidth>
                        <Select
                            value={currency}
                            onChange={(e) => onCurrencyChange(e.target.value)}
                            MenuProps={{
                                className : classes.selectPaper
                            }}
                        >
                           
                            <MenuItem value="USD">
                                💵 USD
                            </MenuItem>
                            <MenuItem value="EUR">
                                💶 Euro
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <PayButtonDiv>
                        <PayPalButtons 
                            style={{ layout: "horizontal" }}
                            createOrder={(data, actions) => onCreateOrder(data, actions)}
                            onApprove={(data, actions) => onApproveOrder(data, actions)}
                        />
                    </PayButtonDiv>
                </>
            )}
        </CheckoutMain>
    );
}

export default Checkout;

const useStyles = makeStyles(() => ({
    selectPaper : {
        "& .MuiPaper-root" : {
            borderRadius : '5px !important',
            border : '1px solid gray !important',
            "&::-webkit-scrollbar-track" : {
                marginTop : '5px',
                marginBottom : '5px'
            },
        },
        "& .MuiList-root" : {
            backgroundColor : 'black !important',
            padding : '0px !important',
        },
        "& .MuiMenuItem-root" : {
            borderBottom : '1px solid gray !important',
            "&:last-child" : {
                borderBottom : 'none !important',
            },
            background : "black !important",
            color : "white !important",
            fontSize : 18,
        },
       "& .MuiBackdrop-root" : {
           background : 'transparent !important'
       }
    },
}));

const PayButtonDiv = tagStyled.div`
    padding-top : 20px;
    width : 100%;

    display : flex;
    justify-content : center;
    align-items : center;
`
const CheckoutMain = tagStyled.div`
    padding-top : 20px;
    width : 100%;

    & .MuiOutlinedInput-root {
        svg {
            color : white;
        }

        & fieldset {
            border-color: gray !important;
        }

        :hover {
            fieldset  {
                border-color: gray !important;
            }
        }
        
        & .Mui-focused  {
            fieldset {
                border-color: gray !important;
            }
        }
    }

    & .MuiInputBase-root {
        borderRadius : 5 ;
        padding : 0px !important ;
        color : white ;
    }
`

const LoadingDiv = tagStyled.div`
    width : 100%;
    display  : flex;
    align-items : center;
    justify-content : center;
`