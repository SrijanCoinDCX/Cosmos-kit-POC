'use client';

import { ChainProvider } from '@cosmos-kit/react';
import { chains, assets } from 'chain-registry';
import { wallets as keplrWallets } from '@cosmos-kit/keplr';
import { wallets as exodusWallets } from '@cosmos-kit/exodus';
import { wallets as coin98Wallets } from '@cosmos-kit/coin98-extension';
import { wallets as oktoWallets } from '../../../wallets/okto-extension';
import { wallets as leapWallets } from "../../../wallets/leap-extension";
import { wallets as cosmostationWallets } from "@cosmos-kit/cosmostation";
import { wallets as finWallets } from "@cosmos-kit/fin";

import "@interchain-ui/react/styles";

function CosmosApp({children}) {
    return (
      <ChainProvider 
        chains={chains} // supported chains
        assetLists={assets} // supported asset lists
        wallets={[
          // ...keplrWallets, 
          ...oktoWallets, 
          ...leapWallets,
          // ...exodusWallets, 
          // ...coin98Wallets, 
          // ...cosmostationWallets, 
          // ...finWallets
        ]} // supported wallets
      >
        {children}
      </ChainProvider>
    );
  }

export default CosmosApp;