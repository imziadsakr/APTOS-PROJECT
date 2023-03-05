import * as React from 'react';

import { useTheme } from '@mui/styles';

import { 
    ContentMain
} from './styled/Content.styled';

import { useDispatch } from 'react-redux';

import { loadAllCartList } from 'src/redux/actions/cart';
import { loadAllPurchasedList } from 'src/redux/actions/nft';

const Content = ({children}) => {
    const theme = useTheme() ;

    const dispatch = useDispatch();

    React.useEffect(() => {
        loadAllCartList(dispatch);
        loadAllPurchasedList(dispatch) ;
        // loadAllPurchasedList(dispatch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) ;
    
    return (
        <ContentMain
            theme={theme}
        >
            {children}
        </ContentMain>
    )
}

export default Content ;