import * as React from 'react' ;

import { useTheme } from '@mui/styles';

import { 
    FooterMain
} from './styled/Footer.styled';

const Footer = () => {
    const theme = useTheme() ;

    return (
        <FooterMain theme={theme}>
        </FooterMain>
    )
}

export default Footer;