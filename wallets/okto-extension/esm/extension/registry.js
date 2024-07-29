import { ICON } from '../constant';
export const oktoExtensionInfo = {
    name: 'okto-extension',
    prettyName: 'Okto',
    logo: ICON,
    mode: 'extension',
    mobileDisabled: false,
    rejectMessage: {
        source: 'Request rejected',
    },
    connectEventNamesOnWindow: ['okto_keystorechange'],
    downloads: [
        {
            device: 'desktop',
            browser: 'chrome',
            link: 'https://chrome.google.com/webstore/detail/okto-cosmos-wallet/fcfcfllfndlomdhbehjjcoimbgofdncg',
        },
        {
            device: 'mobile',
            browser: 'chrome',
            link: 'https://chrome.google.com/webstore/detail/okto-cosmos-wallet/fcfcfllfndlomdhbehjjcoimbgofdncg',
        },
        {
            device: 'mobile',
            browser: 'safari',
            link: 'https://chrome.google.com/webstore/detail/okto-cosmos-wallet/fcfcfllfndlomdhbehjjcoimbgofdncg',
        },
        {
            link: 'https://chrome.google.com/webstore/detail/okto-cosmos-wallet/fcfcfllfndlomdhbehjjcoimbgofdncg',
        },
    ],
};
