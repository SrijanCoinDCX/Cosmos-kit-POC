/// <reference types="react" />
declare type SelectedWalletRepoContextType = {
    selectedWalletRepoName: string;
    selectWalletRepoName: (name: string) => void;
};
export declare const SelectedWalletRepoContext: import("react").Context<SelectedWalletRepoContextType>;
export declare const SelectedWalletRepoProvider: ({ children }: {
    children: any;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useSelectedWalletRepoContext: () => SelectedWalletRepoContextType;
export {};
