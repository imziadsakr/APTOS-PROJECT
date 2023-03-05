import tagStyled from 'styled-components' ;

export const FooterMain = tagStyled.div`
    width : 100%;
    height : ${props => props.theme.layout.footer}px;

    box-sizing : border-box;

    background-color : ${props => props.theme.palette.primary.main};
`