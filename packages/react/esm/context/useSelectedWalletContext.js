import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from "react";
export const SelectedWalletRepoContext = createContext(null);
export const SelectedWalletRepoProvider = ({ children }) => {
    const [selectedWalletRepoName, selectWalletRepoName] = useState('');
    useEffect(() => {
        const selectedWalletName = localStorage.getItem('cosmos-kit@2:core//current-wallet');
        if (selectedWalletName) {
            selectWalletRepoName(selectedWalletName);
        }
    }, []);
    return _jsx(SelectedWalletRepoContext.Provider, { value: {
            selectedWalletRepoName, selectWalletRepoName
        }, children: children });
};
export const useSelectedWalletRepoContext = () => useContext(SelectedWalletRepoContext);
