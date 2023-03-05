import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import * as locale from '@mui/material/locale';

const secondary = "#C72127";
const background = '#F5F5F5';

// border
const BorderRadius = {
    tiny : '5px',
    small : '10px',
    medium : '15px',
    large : '25px',
    half : '50%'
}
const borderWidth = 1;

// spacing
const spacing = 8;

const theme = createTheme({
    layout: {
        header : 80 ,
        footer : 40 ,
        breadcumb : 45,
        status : 50,
    },
    palette: {
        primary: { main: '#1679c9', dark: '#094472', light : '#bdf8ff', normal : '#29b1ef' },
        secondary: { main: secondary },
        common: {
        },
        tonalOffset: 0.2,
        background: {
            default: background,
            gray: '#f1f1f170'
        },
        spacing
    },
    border: {
        borderWidth: borderWidth,
        borderRadius : {
            ...BorderRadius
        }
    },
    overrides: {

    },
    typography: {
        // fontFamily: "Montserrat",

        useNextVariants: true
    }
}, locale['enUS']);

export default responsiveFontSizes(theme);
