import { Cdcwallet } from './types';
export interface CdcwalletWindow {
    cdc_wallet?: {
        cosmos?: Cdcwallet;
    };
}
export declare const getCdcwalletFromExtension: () => Promise<Cdcwallet | undefined>;
