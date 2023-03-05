import tagStyled from 'styled-components' ;

import { Link } from 'react-router-dom';

import {
    styled
} from '@mui/material';

export const HeaderMain = tagStyled.div`
    width : 100%;
    height : ${props => props.theme.layout.header}px;
    box-sizing : border-box ;

    display : flex;
    justify-content : space-between ;
    align-items : center;
    
    gap : 10px;

    padding : 10px 2%;

    background : black;
`
export const NavBar = tagStyled.div`
    display : flex;
    align-items : center;
    gap : 30px;
`

export const ToolBar = tagStyled.div`
    display : flex;
    align-items : center;
    gap : 20px;
`

export const LogoImage = tagStyled.img`
    border-radius : 10px;
    width : 150px;
`

export const NavList = tagStyled.div`
    display : flex;
    align-items :center;
    gap : 25px;
`
export const ToolItem = tagStyled.p`
    :hover {
        color : red ;
    }

    transition : 0.2s;
    margin : 0px;
    color : white;
    font-size : 17px;
    
    cursor: pointer;

    display : flex;
    align-items : center;
    justify-content : center;

    svg {
        width : 32px;
        height : 32px;
    }
`

export const NavItem = styled(Link)`
    text-decoration : none ;
    color : white;
    font-size : 17px;
    cursor : pointer;

    height : 100%;

    display : flex;
    align-items : flex-start;
    justify-content: center;
    
    transition: 0.3s;

    &.active {
        color : red;

        :after {
            position : absolute;
            bottom : -10px;
            content : '';
            width : 100% ;
            height : 2px;
            background : red;
        }
    }

    position : relative;

    :hover {
        color : red;
    }
`