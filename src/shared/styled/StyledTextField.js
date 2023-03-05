import {
    TextField,
    styled
} from '@mui/material';

export default styled(TextField)`

    & .MuiFormHelperText-root {
        font-size : 14px;
        font-weight : bold;
        color : red;
        text-align : left;
        width : 100%;
    }

    &.success {
        & .MuiFormHelperText-root {
            color : #18bd18;
        }
    }

    &.error {
        & .MuiFormHelperText-root {
            color : red;
        }
    }

    & .MuiOutlinedInput-root {
        svg {
            color : white;
        }
        
        background : #1F2025 !important;
        border-radius : 10px;

        & fieldset {
            border-color: none;
        }

        &:hover fieldset {
            border-color: none;
        }

        &.Mui-focused fieldset {
            border : 2px solid red;
        }

    }

    & .MuiInputBase-input {
        background : #1F2025 !important;
        color : white !important;
        border-radius : 10px;
        padding : 15px !important;
    }
`