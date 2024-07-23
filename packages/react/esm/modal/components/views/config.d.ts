/// <reference types="react" />
import { ModalViews, Wallet, WalletListViewProps, WalletViewProps } from '@cosmos-kit/core';
export declare type ModalViewImpl = {
    head: React.ReactNode;
    content: React.ReactNode;
};
export declare type WalletViewImplGetter = (props: WalletViewProps) => ModalViewImpl;
export declare type WalletListImplGetter = (props: WalletListViewProps) => ModalViewImpl;
export declare const defaultModalViews: Record<keyof ModalViews, WalletViewImplGetter | WalletListImplGetter>;
export declare function getWalletProp(wallet: Wallet): {
    name: string;
    prettyName: string;
    logo: string;
    mobileDisabled: boolean;
    isMobile: boolean;
};
