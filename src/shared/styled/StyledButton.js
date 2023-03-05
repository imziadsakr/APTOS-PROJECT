import {
    styled,
    Button
} from '@mui/material';

export default styled(Button)`
    background : #fe3301;
    border-radius : 30px;
    padding: 10px 30px;
    color : white;
    text-transform : capitalize ;

    :hover {
        background : #fe3301; 
    }

    &:disabled {
        background : gray;
        cursor : not-allowed !important;
    }
`