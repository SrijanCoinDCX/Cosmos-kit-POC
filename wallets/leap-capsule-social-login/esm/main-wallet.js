import { MainWalletBase } from '@cosmos-kit/core';
import { CapsuleProvider, } from '@leapwallet/cosmos-social-login-capsule-provider';
import { ChainCosmosSocial } from './chain-wallet';
import { CosmosCapsuleClient } from './client';
export class LeapCapsuleWallet extends MainWalletBase {
    constructor(walletInfo) {
        super(walletInfo, ChainCosmosSocial);
    }
    async initClient() {
        this.initingClient();
        try {
            this.initClientDone(new CosmosCapsuleClient({
                loginProvider: new CapsuleProvider({
                    apiKey: process.env.CAPSULE_KEY || process.env.NEXT_PUBLIC_CAPSULE_KEY,
                    env: process.env.CAPSULE_ENV ||
                        process.env
                            .NEXT_PUBLIC_CAPSULE_ENV,
                }),
            }));
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
