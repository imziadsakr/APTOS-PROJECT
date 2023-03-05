import * as React from 'react' ;

import { Drawer } from '@mui/material';

import { useStyles } from './styled/WalletDrawer.styled';

import { ConnectButton } from '@rainbow-me/rainbowkit';

const WalletDrawer = (props) => {
    const classes = useStyles() ;

    const {
        open,
        handleDrawer
    } = props ;

    return (
        <Drawer
            variant='persistent'
            anchor='right'
            open={open}
            className={classes.drawer}
            classes={{
                paper : classes.drawerPaper
            }}
            onClick={handleDrawer}
        >
            <ConnectButton />
        </Drawer>
    )
}

export default WalletDrawer ;