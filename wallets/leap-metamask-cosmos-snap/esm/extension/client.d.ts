import { AminoSignResponse, OfflineAminoSigner, StdSignature, StdSignDoc } from '@cosmjs/amino';
import { Algo, DirectSignResponse } from '@cosmjs/proto-signing';
import { ChainRecord, DirectSignDoc, SignType } from '@cosmos-kit/core';
import { SignOptions, WalletClient } from '@cosmos-kit/core';
import { SignDoc } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
export declare class CosmosSnapClient implements WalletClient {
    readonly snapInstalled: boolean;
    private _defaultSignOptions;
    get defaultSignOptions(): SignOptions;
    setDefaultSignOptions(options: SignOptions): void;
    constructor();
    getSimpleAccount(chainId: string): Promise<{
        namespace: string;
        chainId: string;
        address: string;
        username: string;
    }>;
    handleConnect(): Promise<void>;
    getAccount(chainId: string): Promise<{
        username: string;
        address: string;
        algo: Algo;
        pubkey: Uint8Array;
    }>;
    getOfflineSigner(chainId: string, preferredSignType?: SignType): OfflineAminoSigner | {
        getAccounts: () => Promise<{
            username: string;
            address: string;
            algo: Algo;
            pubkey: Uint8Array;
        }[]>;
        signDirect: (signerAddress: string, signDoc: SignDoc) => Promise<DirectSignResponse>;
    };
    getOfflineSignerAmino(chainId: string): OfflineAminoSigner;
    getOfflineSignerDirect(chainId: string): {
        getAccounts: () => Promise<{
            username: string;
            address: string;
            algo: Algo;
            pubkey: Uint8Array;
        }[]>;
        signDirect: (signerAddress: string, signDoc: SignDoc) => Promise<DirectSignResponse>;
    };
    signAmino(chainId: string, signer: string, signDoc: StdSignDoc, signOptions?: SignOptions): Promise<AminoSignResponse>;
    signDirect(chainId: string, signer: string, signDoc: DirectSignDoc): Promise<DirectSignResponse>;
    signArbitrary(chainId: string, signer: string, data: string): Promise<StdSignature>;
    addChain(chainRecord: ChainRecord): Promise<void>;
}
