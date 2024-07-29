import { ClientNotExistError } from '@cosmos-kit/core';
export const getOktoFromExtension = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    const okto = window.okto;
    if (okto) {
        return okto;
    }
    if (document.readyState === 'complete') {
        if (okto) {
            return okto;
        }
        else {
            throw ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                if (okto) {
                    resolve(okto);
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
