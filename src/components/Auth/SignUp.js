import * as React from 'react' ;

import { 
    Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';

import { StyledButton, StyledPaper, StyledTextField } from 'src/shared/styled';

import {
    Label
} from './styled/Login.styled';

import Loading from 'react-loading-components';

import { validatorEmail, validatorPassword } from 'src/utils/helper/validateHelper';
import axios from 'axios';
import { backend_endpoint } from 'src/utils/static';
import swal from 'sweetalert';

const SignUp = (props) => {
    const {
        open,
        handleClose
    } = props ;

    const [loading, setLoading] = React.useState(false) ;
    const [email, setUserEmail] = React.useState('');
    const [password, setUserPassword] = React.useState('');
    const [confirm_password, setConfirmPassword] = React.useState('');

    const clickSignUp = async () => {
        setLoading(true) ;
        try {
            await axios.post(`${backend_endpoint}auth/signUp`, {
                email,
                password,
                confirm_password
            }, {
                'Access-Control-Allow-Origin' : '*',
            }) ;

            swal({
                title : 'Success',
                text: "Sign Up Successful",
                timer : 2000,
                buttons : false,
                icon : 'success'
            })
        } catch(err) {
            console.log(err) ;
        }

        initializeForm() ;
        handleClose();

        setLoading(false) ;
    }

    const initializeForm = () => {
        setConfirmPassword('');
        setUserPassword('');
        setUserEmail('') ;
    }
    
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperComponent={StyledPaper}
            fullWidth
        >
            <DialogTitle>
                Welcome to APTOS !
            </DialogTitle>
            <DialogContent>
                <Label>
                    Email
                </Label>
                <StyledTextField 
                    value={email}
                    onChange={(e) => setUserEmail(e.target.value)}
                    fullWidth
                    placeholder='Enter you email'
                    helperText={(!validatorEmail(email) && email) ? 'Invalid email' : ''}
                />
                <div style={{marginBottom : 10}} />
                <Label>
                    Password
                </Label>
                <StyledTextField
                    fullWidth 
                    value={password}
                    onChange={(e) => setUserPassword(e.target.value)}
                    placeholder='Enter your password'
                />
                <div style={{marginBottom : 10}} />
                <Label>
                    Confirm Password
                </Label>
                <StyledTextField
                    fullWidth 
                    value={confirm_password}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder='Enter your confirmation password'
                />
                <div style={{marginBottom : 10}} />
                <Label>
                    Go to <span style={{
                        color: 'red', 
                        cursor : 'pointer',
                    }}
                    onClick={() => {
                        handleClose();
                        // handleOpenSignUp();
                    }}
                    >Sign In</span>
                </Label>
            </DialogContent>
            <DialogActions>
                <StyledButton
                    disabled={
                        confirm_password !== password
                        || !validatorPassword(password) || !validatorPassword(confirm_password)
                        || !validatorEmail(email)
                        || loading
                    }
                    onClick={() => clickSignUp()}
                >
                    { loading && <Loading type='oval' width={20} height={20} fill='white'/> } &nbsp; Sign Up
                </StyledButton>
            </DialogActions>
        </Dialog>
    )
}

export default SignUp ;