import * as React from "react";

import { RouteProvider } from "src/shared/hooks/useRouteData";

import { Routes , Route } from "react-router-dom";

import { connect } from 'react-redux' ;

import Header from "src/components/Layouts/Header";
import Footer from "src/components/Layouts/Footer";
import Content from "src/components/Layouts/Content";

import Dashboard from "./Dashboard";
import Cart from "./Cart";
import Mint from "./Mint";
import Purchased from "./Purchased";

import { 
    BackdropOverlay,
    LayoutMain
} from "./styled/Layout.styled";

import { WalletProvider } from "src/shared/hooks/useWalletData";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import 'react-circular-progressbar/dist/styles.css';

const Layout = (props) => {

    const initialOptions = {
        "client-id": 'AQBmw8VsfOx9kJKbHs105jiA3sbqGt_5Z7qgOi645oLyE-KZRlBhXgl2toegnSSgqAQs5_Ibk7oJGySK',
        currency: "USD",
        intent: "capture",
    };

    return (
        <PayPalScriptProvider
            options={initialOptions}
        >
            <WalletProvider>
                <LayoutMain>
                    <BackdropOverlay>
                        <RouteProvider>
                            <Header />
                            <Content>
                                <Routes>
                                    <Route path="/" element={< Dashboard />} />
                                    <Route path="/dashboard" element={< Dashboard />} />
                                    <Route path="/cart" element={< Cart />} />
                                    <Route path="/mint" element={<Mint />} />
                                    <Route path="/purchased" element={<Purchased />} />
                                </Routes>
                            </Content>
                            {/* <Footer /> */}
                        </RouteProvider>
                    </BackdropOverlay>
                </LayoutMain>
            </WalletProvider>
        </PayPalScriptProvider>
    );
}
const mapStateToProps = state => ({
 
}) ;
const mapDispatchToProps = {

} ;
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
