import { ClientNotExistError } from '@cosmos-kit/core';
export const getCdcwalletFromExtension = async () => {
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
            throw ClientNotExistError;
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
                    reject(ClientNotExistError.message);
                }
                document.removeEventListener('readystatechange', documentStateChange);
            }
        };
        document.addEventListener('readystatechange', documentStateChange);
    });
};
