import * as React from 'react' ;

import {
    Popover,
} from '@mui/material' ;

import { ConnectButton } from '@rainbow-me/rainbowkit';

import { makeStyles } from '@mui/styles';

import '@rainbow-me/rainbowkit/styles.css';

const useStyles = makeStyles((theme) => ({
    popover : {
        zIndex : "1500 !important",
        left : 'calc( 100% - 250px) !important',
        width : '200px',

    }
}))


const WalletPopover = (props) => {

    const classes = useStyles() ;

    const {
        open , anchorEl , handlePopOver
    } = props ;

    return (
        <>
            <Popover
                id="wallet-popover"
                anchorEl={anchorEl}
                open={open}

                onClose={handlePopOver}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                classes={{
                    paper : classes.popover
                }}
            >
                <ConnectButton />
            </Popover>
        </>
    )
}

export default WalletPopover;