import type { AssetList, Chain } from '@chain-registry/types';
import { ChainName, EndpointOptions, LogLevel, MainWalletBase, NameServiceName, SessionOptions, SignerOptions, WalletConnectOptions, WalletManager, WalletModalProps } from '@cosmos-kit/core';
import { ReactNode } from 'react';
export declare const walletContext: import("react").Context<{
    walletManager: WalletManager;
    modalProvided: boolean;
}>;
export declare function ChainProvider({ chains, assetLists, wallets, walletModal: ProvidedWalletModal, throwErrors, subscribeConnectEvents, defaultNameService, walletConnectOptions, signerOptions, endpointOptions, sessionOptions, logLevel, allowedIframeParentOrigins, children, }: {
    chains: (Chain | ChainName)[];
    wallets: MainWalletBase[];
    assetLists?: AssetList[];
    walletModal?: (props: WalletModalProps) => JSX.Element;
    throwErrors?: boolean | 'connect_only';
    subscribeConnectEvents?: boolean;
    defaultNameService?: NameServiceName;
    walletConnectOptions?: WalletConnectOptions;
    signerOptions?: SignerOptions;
    endpointOptions?: EndpointOptions;
    sessionOptions?: SessionOptions;
    logLevel?: LogLevel;
    /**
     * Origins to allow wrapping this app in an iframe and connecting to this
     * Cosmos Kit instance.
     *
     * Defaults to Osmosis and DAO DAO.
     */
    allowedIframeParentOrigins?: string[];
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
