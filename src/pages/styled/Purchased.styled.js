import tagStyled from 'styled-components';

export const PurchasedMain = tagStyled.div`
    display : flex;
    flex-wrap : wrap;
    gap : 30px;

    width : fit-content;
    margin-top : 40px;
`

export const NFTCard = tagStyled.div`

    :hover {
        transform : translateY(-5px);
    }

    box-shadow : 1px 1px 4px 1px #6db1dd;
    transition : 0.3s;

    width : 300px;

    display : flex;
    flex-direction : column;
    align-items : center;

    overflow : hidden;
    border-radius: 30px;

    cursor : pointer;

    background : #22242b;

    padding: 10px;
`

export const NFTAsset = tagStyled.img`
    width : 100%;
    height : 300px;

    border-radius : 20px;
`

export const NFTName = tagStyled.div`
    padding-top : 15px;
    padding-left : 10px;

    color : white;
    font-size : 19px;
    
    width : 100%;
    text-align : left;
`
export const NFTDesc = tagStyled.div`
    padding-top : 5px;
    padding-bottom : 10px;
    padding-left : 10px;

    color : white;
    font-size : 15px;
    
    width : 100%;
    text-align : left;
`

export const ButtonDiv = tagStyled.div`
    border-top : 1px solid gray;

    width : 100%;
    
    display : flex;
    justify-content : flex-end;
    
    padding-right: 10px;
    padding-top : 10px;
    padding-bottom : 10px;

    button {
        padding-top : 10px;
        padding-bottom : 10px;

        cursor : pointer;
        width : 100%;
        background : #4662f7;
        border-radius : 30px;
        color : white;
        border : none;

        font-size : 17px;
        font-weight : bold;

        :hover {
            background : #8094ff;
        }
    }
`