"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSelectedWalletRepoContext = exports.SelectedWalletRepoProvider = exports.SelectedWalletRepoContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
exports.SelectedWalletRepoContext = (0, react_1.createContext)(null);
const SelectedWalletRepoProvider = ({ children }) => {
    const [selectedWalletRepoName, selectWalletRepoName] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        const selectedWalletName = localStorage.getItem('cosmos-kit@2:core//current-wallet');
        if (selectedWalletName) {
            selectWalletRepoName(selectedWalletName);
        }
    }, []);
    return (0, jsx_runtime_1.jsx)(exports.SelectedWalletRepoContext.Provider, { value: {
            selectedWalletRepoName, selectWalletRepoName
        }, children: children });
};
exports.SelectedWalletRepoProvider = SelectedWalletRepoProvider;
const useSelectedWalletRepoContext = () => (0, react_1.useContext)(exports.SelectedWalletRepoContext);
exports.useSelectedWalletRepoContext = useSelectedWalletRepoContext;
