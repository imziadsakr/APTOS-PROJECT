import tagStyled from 'styled-components';

import { styled, TableContainer } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
    paper : {
        backgroundColor :'black !important',
        "& .MuiList-root" : {
            padding : '0px !important',
        },
        "& .MuiMenuItem-root" : {
            borderBottom : '1px solid gray !important',
            "&:last-child" : {
                borderBottom : 'none !important',
            },
            background : "black !important",
            color : "white !important",
        },
    },
}))




export const NFTTableContainer = styled(TableContainer)`
    width  : 100%;

    border : 1px solid rgb(100,116,139);
    padding : 10px;

    & .MuiTableCell-root {
        text-align : center;
    }
    
    & .MuiTableHead-root {
        & .MuiTableCell-root {
            padding : 10px;
            font-size : 15px;
            color : white;

            border-bottom : 1px solid gray;
        }
    }

    & .MuiTableBody-root {
        & .MuiTableRow-root {
            cursor : pointer;
    
            :hover {
                background : #000000b5;
            }
        }

        & .MuiTableCell-root {
            padding : 5px;
            color : white;
            border-bottom : 1px solid gray;

            button {
                cursor : pointer;
                padding : 5px;
            }
        }
    }

    & .MuiTableFooter-root {
        svg {
            color : white;
        }

        & .MuiTableRow-root {
            & .MuiTableCell-root {
                color : white;
                border : none !important;
            }
        }
    }
`

export const NFTAsset = tagStyled.img`
    width : 50px;
    height : 50px;
    border-radius : 5px;
`