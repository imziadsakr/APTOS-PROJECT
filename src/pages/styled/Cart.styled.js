import tagStyled from 'styled-components';

export const CartMain = tagStyled.div`
    display : flex;
    flex-wrap : wrap;
    gap : 30px;

    width : fit-content;
    margin-top : 40px;
`

export const NFTCard = tagStyled.div`

    :hover {
        transform : translateY(-10px);
    }

    box-shadow : 1px 1px 4px 1px #6db1dd;
    transition : 0.3s;

    width : 250px;

    display : flex;
    flex-direction : column;
    align-items : center;

    border : 5px solid #442412;

    overflow : hidden;
    border-radius: 5px;

    cursor : pointer;

    background : #07081e;
`

export const NFTAsset = tagStyled.img`
    width : 250px;
    height : 250px;
`

export const NFTName = tagStyled.div`
    padding : 5px 5px;

    color : white;
    font-size : 19px;
    
    width : 100%;
    text-align : left;
`
export const NFTDesc = tagStyled.div`
    padding : 5px 5px;

    color : white;
    font-size : 15px;
    
    width : 100%;
    text-align : left;
`

export const ButtonDiv = tagStyled.div`
    border-top : 1px solid gray;

    width : 100%;
    
    display : flex;
    justify-content : space-around;
    
    padding-top : 10px;
    padding-bottom : 10px;

    button {
        padding : 5px;
        cursor : pointer;
        min-width : 70px;
    }
`