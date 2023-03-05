import * as React from 'react' ;

import { Provider } from 'react-redux';
import store from '../redux' ;
// Router
import { BrowserRouter , Routes , Route } from 'react-router-dom';

import { ThemeProvider, CssBaseline } from '@mui/material';

import theme from 'src/utils/theme';

const Layout = React.lazy(() => import('./Layout')) ;

const Main = () => {
    return (
        <BrowserRouter>
            {/* <LanguageProvider> */}
                <Provider store={store}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <React.Suspense fallback={<React.Fragment />} >
                            <Routes>
                                <Route path="*" element={<Layout />} />
                            </Routes>
                        </React.Suspense>
                    </ThemeProvider>
                </Provider>
            {/* </LanguageProvider> */}
        </BrowserRouter>
    )
}

export default Main ;