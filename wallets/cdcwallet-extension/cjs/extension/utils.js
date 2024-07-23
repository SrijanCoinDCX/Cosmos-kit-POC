"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCdcwalletFromExtension = void 0;
const core_1 = require("@cosmos-kit/core");
const getCdcwalletFromExtension = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    const cdcwallet = window.cdc_wallet?.cosmos;
    if (cdcwallet) {
        return cdcwallet;
    }
    if (document.readyState === 'complete') {
        if (cdcwallet) {
            return cdcwallet;
        }
        else {
            throw core_1.ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                if (cdcwallet) {
                    resolve(cdcwallet);
                }
                else {
                    reject(core_1.ClientNotExistError.message);
                }
                document.removeEventListener('readystatechange', documentStateChange);
            }
        };
        document.addEventListener('readystatechange', documentStateChange);
    });
};
exports.getCdcwalletFromExtension = getCdcwalletFromExtension;
