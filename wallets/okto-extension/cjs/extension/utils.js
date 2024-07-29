"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOktoFromExtension = void 0;
const core_1 = require("@cosmos-kit/core");
const getOktoFromExtension = async () => {
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
            throw core_1.ClientNotExistError;
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
                    reject(core_1.ClientNotExistError.message);
                }
                document.removeEventListener('readystatechange', documentStateChange);
            }
        };
        document.addEventListener('readystatechange', documentStateChange);
    });
};
exports.getOktoFromExtension = getOktoFromExtension;
