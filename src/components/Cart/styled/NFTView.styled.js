import tagStyled from 'styled-components';

export const NFTViewMain = tagStyled.div`
    width : 100%;

    background : black ;

    border-radius : 5px;

    overflow : hidden ;

    p {
        margin : 0px;
        padding-left : 10px;
        padding-right : 10px;
    }
`

export const NFTOwner = tagStyled.p`
    padding-top : 5px;
    font-size : 20px;
    color : rgb(100, 116, 139);
`

export const NFTImage = tagStyled.img`
    width : 50%;
    min-width : 300px;

    border-radius : 5px;
`

export const NFTName = tagStyled.p`
    color : white;
    font-size : 23px;
    padding : 5px;
`

export const NFTDesc = tagStyled.p`
    color : rgb(100, 116, 139);
    font-size : 20px;
`