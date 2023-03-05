import {  
    makeStyles
} from '@mui/styles' ;

export const useStyles = makeStyles((theme) => ({
    drawer: {
        backgroundColor : 'black !important',
    },
    drawerPaper: {
        width : "400px",
        border : '1px solid gray !important',
        boxSizing : 'border-box !important',
        padding : '10px !important',
        top : `${theme.layout.header}px !important`,
        backgroundColor : "black !important",
        color : "white !important",
    },
}))