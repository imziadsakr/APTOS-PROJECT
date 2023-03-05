import * as React from 'react' ;

import '@rainbow-me/rainbowkit/styles.css';

import { darkTheme, getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai, foundry, avalancheFuji } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

window.Buffer = window.Buffer || require("buffer").Buffer;

const { chains, provider } = configureChains(
	[polygonMumbai, foundry, avalancheFuji ],
	[alchemyProvider({ 
		apiKey: 'TM_2HoUNaGB5IX6grUxMx9dWOti85Kff', 
		infuraId: 'ded2c8aa580d44d2b63c2b88c03fe3a3'
	}), 
	publicProvider()]
);

const { connectors } = getDefaultWallets({
	appName: "My Alchemy DApp",
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

const Main = React.lazy(() => import('./pages/Main')) ;

const App = () => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider modalSize="large" coolMode chains={chains} theme={darkTheme({
				accentColor: "#FF3300"
			})}>
        <Main />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
