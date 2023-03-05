import tagStyled from 'styled-components';

export const MintNowDiv = tagStyled.div`
    p {
        text-align : center;
    }

    background : black;
    border-radius : 20px;
    padding : 20px 40px;
    color: white;

    display :flex;
    flex-direction : column;
    align-items : center;

    max-width : 450px;
`

export const TitleDiv = tagStyled.p`
    font-size : 24px;
    margin-top : 32px;
    color : white;
`

export const DescPara = tagStyled.p`
    color: #64748b;
    font-size : 16px;
    margin : 0px;
`

export const CloseDiv = tagStyled.div`
    position : absolute;
    border-radius : 50%;

    width : 40px;
    height : 40px;

    top : 10px;
    right : 20px;

    background-color: #ffffff7a;

    display : flex;
    justify-content : center;
    align-items : center;

    cursor : pointer;
    transition : 0.3s;
    
    :hover {
        background-color : white;
    }
`

export const CircularDiv = tagStyled.div`
    width : 150px;
    height : 150px;

    margin-top : 40px;
    margin-bottom : 20px;
`