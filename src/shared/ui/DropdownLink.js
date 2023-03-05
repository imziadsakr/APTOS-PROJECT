import * as React from 'react';

import tagStyled from 'styled-components' ;

const DropwDownLink = ({children, label}) => {
    const [isHidden, setIsHidden] = React.useState(true);

    return (
        <DropwDownLinkDiv onMouseOver={() => setIsHidden(false)} onMouseOut={() => setIsHidden(true)}>
            {label}
            {
                <DropdownPadArea  
                    isHidden={isHidden} 
                    onMouseOver = {() => setIsHidden(false)}  
                    onMouseOut={() => setIsHidden(true)}
                >
                    <DropdownPad
                       
                    >
                        {children}
                    </DropdownPad>
                </DropdownPadArea>
            }
        </DropwDownLinkDiv>
    )
}

export default DropwDownLink ;

const DropwDownLinkDiv = tagStyled.div`
    z-index : 9998;
    position : relative;

    :hover {
        color : red ;
    }

    transition : 0.2s;
    margin : 0px;
    color : white;
    font-size : 20px;
    
    cursor: pointer;

    svg {
        width : 32px;
        height : 32px;
    }
`

const DropdownPadArea = tagStyled.div`
    display : ${props => props.isHidden ? "none" : "block"} ;
    position : absolute;

    right : 10px;
    top : 10px;
    z-index : 9999;
`

const DropdownPad = tagStyled.div`
    margin-top : 20px;

    box-shadow : 1px 1px 9px 0px grey;

    background-color : white;
`