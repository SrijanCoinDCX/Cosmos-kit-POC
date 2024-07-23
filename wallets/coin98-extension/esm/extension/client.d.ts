import { StdSignature, StdSignDoc } from '@cosmjs/amino';
import { Algo } from '@cosmjs/proto-signing';
import { BroadcastMode, ChainRecord, DirectSignDoc, SignOptions, SignType, WalletClient } from '@cosmos-kit/core';
import { Coin98 } from './types';
import { SignDoc } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
export declare class Coin98Client implements WalletClient {
    readonly client: Coin98;
    private _defaultSignOptions;
    get defaultSignOptions(): SignOptions;
    setDefaultSignOptions(options: SignOptions): void;
    constructor(client: Coin98);
    enable(chainIds: string | string[]): Promise<void>;
    connect(chainIds: string | string[]): Promise<void>;
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
    getOfflineSigner(chainId: string, preferredSignType?: SignType): import("@keplr-wallet/types").OfflineAminoSigner | {
        getAccounts: () => Promise<{
            username: string;
            address: string;
            algo: Algo;
            pubkey: Uint8Array;
        }[]>;
        signDirect: (signerAddress: string, signDoc: SignDoc) => Promise<{
            signed: {
                accountNumber: bigint;
                bodyBytes: Uint8Array;
                authInfoBytes: Uint8Array;
                chainId: string;
            };
            signature: import("@keplr-wallet/types").StdSignature;
        }>;
    };
    getOfflineSignerAmino(chainId: string): import("@keplr-wallet/types").OfflineAminoSigner;
    getOfflineSignerDirect(chainId: string): {
        getAccounts: () => Promise<{
            username: string;
            address: string;
            algo: Algo;
            pubkey: Uint8Array;
        }[]>;
        signDirect: (signerAddress: string, signDoc: SignDoc) => Promise<{
            signed: {
                accountNumber: bigint;
                bodyBytes: Uint8Array;
                authInfoBytes: Uint8Array;
                chainId: string;
            };
            signature: import("@keplr-wallet/types").StdSignature;
        }>;
    };
    addChain(chainInfo: ChainRecord): Promise<void>;
    signAmino(chainId: string, signer: string, signDoc: StdSignDoc, signOptions?: SignOptions): Promise<import("@keplr-wallet/types").AminoSignResponse>;
    signDirect(chainId: string, signer: string, signDoc: DirectSignDoc, signOptions?: SignOptions): Promise<{
        signed: {
            accountNumber: bigint;
            bodyBytes: Uint8Array;
            authInfoBytes: Uint8Array;
            chainId: string;
        };
        signature: import("@keplr-wallet/types").StdSignature;
    }>;
    signArbitrary(chainId: string, signer: string, data: string | Uint8Array): Promise<StdSignature>;
    sendTx(chainId: string, tx: Uint8Array, mode: BroadcastMode): Promise<Uint8Array>;
}
