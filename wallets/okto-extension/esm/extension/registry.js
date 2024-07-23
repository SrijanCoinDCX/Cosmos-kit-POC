import { ICON } from '../constant';
export const oktoExtensionInfo = {
    name: 'okto-extension',
    prettyName: 'Okto',
    logo: ICON,
    mode: 'extension',
    mobileDisabled: () => !('okto' in window || /OktoCosmos/i.test(navigator.userAgent)),
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
            link: 'https://chrome.google.com/webstore/detail/okto-cosmos-wallet/fcfcfllfndlomdhbehjjcoimbgofdncg',
        },
    ],
};
//# sourceMappingURL=registry.js.map