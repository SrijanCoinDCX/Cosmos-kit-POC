import { StdSignature, StdSignDoc } from '@cosmjs/amino';
import { Algo } from '@cosmjs/proto-signing';
import { DirectSignDoc, SignOptions, WalletClient } from '@cosmos-kit/core';
import { Okxwallet } from './types';
export declare class OkxwalletClient implements WalletClient {
    readonly client: Okxwallet;
    private _defaultSignOptions;
    get defaultSignOptions(): SignOptions;
    setDefaultSignOptions(options: SignOptions): void;
    constructor(client: Okxwallet);
    enable(chainIds: string | string[]): Promise<void>;
    getSimpleAccount(chainId: string): Promise<{
        namespace: string;
        chainId: string;
        address: string;
        username: string;
    }>;
    getAccount(chainId: string): Promise<{
        username: string;
        address: string;
        algo: Algo;
        pubkey: Uint8Array;
    }>;
    signAmino(chainId: string, signer: string, signDoc: StdSignDoc, signOptions?: SignOptions): Promise<import("@cosmjs/amino").AminoSignResponse>;
    signDirect(chainId: string, signer: string, signDoc: DirectSignDoc, signOptions?: SignOptions): Promise<import("@cosmjs/proto-signing").DirectSignResponse>;
    signArbitrary(chainId: string, signer: string, data: string | Uint8Array): Promise<StdSignature>;
    getOfflineSigner(chainId: string): import("@cosmjs/proto-signing").OfflineSigner & import("@cosmjs/proto-signing").OfflineDirectSigner;
}
