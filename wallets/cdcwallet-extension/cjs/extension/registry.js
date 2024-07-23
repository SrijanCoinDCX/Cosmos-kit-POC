"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cdcwalletExtensionInfo = void 0;
const constant_1 = require("../constant");
exports.cdcwalletExtensionInfo = {
    name: 'cdcwallet-extension',
    prettyName: 'Crypto.com Wallet',
    logo: constant_1.ICON,
    mode: 'extension',
    mobileDisabled: () => false,
    rejectMessage: {
        source: 'Request rejected',
    },
    connectEventNamesOnWindow: ['cdcwallet_keystorechange'],
    downloads: [
        {
            device: 'desktop',
            browser: 'chrome',
            link: 'https://chromewebstore.google.com/detail/cryptocom-wallet-extensio/hifafgmccdpekplomjjkcfgodnhcellj',
        },
        {
            device: 'mobile',
            os: 'android',
            link: 'https://wallet.crypto.com/deeplink',
        },
        {
            device: 'mobile',
            os: 'ios',
            link: 'https://wallet.crypto.com/deeplink',
        },
        {
            link: 'https://wallet.crypto.com/deeplink',
        },
    ],
};
