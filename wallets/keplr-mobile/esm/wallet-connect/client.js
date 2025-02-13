import { ExpiredError, RejectedError, State, } from '@cosmos-kit/core';
import { WCClient } from '@cosmos-kit/walletconnect';
import Long from 'long';
import { KeplrWalletConnectV2 } from '@keplr-wallet/wc-client';
export class KeplrClient extends WCClient {
    keplr = undefined;
    constructor(walletInfo) {
        super(walletInfo);
    }
    initKeplrWCClient(signClient, options) {
        this.keplr = new KeplrWalletConnectV2(signClient, options);
        // This is for Keplr App Deep Linking
        // https://github.com/chainapsis/keplr-wallet/blob/120a7a32b54a0976ea3d386b3105e2c41eaf41bf/packages/wc-client/src/index.ts#L209
        localStorage.setItem('wallet-connect-v2-mobile-link', JSON.stringify(this.env?.os === 'android'
            ? {
                name: 'Keplr',
                href: 'intent://wcV2#Intent;package=com.chainapsis.keplr;scheme=keplrwallet;end;',
            }
            : {
                name: 'Keplr',
                href: `keplrwallet://wcV2`,
            }));
    }
    async connect(chainIds, options) {
        if (typeof this.signClient === 'undefined') {
            await this.init();
            // throw new Error('WalletConnect is not initialized');
        }
        if (this.qrUrl.state !== 'Init') {
            this.setQRState(State.Init);
        }
        const chainIdsWithNS = typeof chainIds === 'string'
            ? [`cosmos:${chainIds}`]
            : chainIds.map((chainId) => `cosmos:${chainId}`);
        this.restorePairings();
        const pairing = this.pairing;
        this.logger?.debug('Restored active pairing topic is:', pairing?.topic);
        // If the pairing topic is already set, try to connect to the session
        if (this.signClient && pairing?.topic) {
            const allSessions = this.signClient.session.getAll();
            const currentSession = allSessions.find((session) => session.pairingTopic === pairing.topic);
            if (allSessions.length > 0 && currentSession) {
                this.initKeplrWCClient(this.signClient, {
                    sessionProperties: currentSession.sessionProperties,
                });
                return;
            }
        }
        if (this.displayQRCode)
            this.setQRState(State.Pending);
        const requiredNamespaces = {
            cosmos: {
                methods: [
                    'cosmos_getAccounts',
                    'cosmos_signAmino',
                    'cosmos_signDirect',
                    ...(this.requiredNamespaces?.methods ?? []),
                ],
                chains: chainIdsWithNS,
                events: [
                    'chainChanged',
                    'accountsChanged',
                    ...(this.requiredNamespaces?.events ?? []),
                ],
            },
        };
        let connectResp;
        try {
            this.logger?.debug('Connecting chains:', chainIdsWithNS);
            connectResp = await this.signClient?.connect({
                pairingTopic: pairing?.topic,
                requiredNamespaces,
                ...options,
            });
            // https://github.com/cosmology-tech/projects-issues/issues/349
            // Commented out because of the issue above.
            // if (typeof connectResp.uri === 'undefined') {
            //   throw new Error('Failed to generate WalletConnect URI!');
            // }
            this.qrUrl.data = connectResp.uri;
            this.logger?.debug('Using QR URI:', connectResp.uri);
            if (this.displayQRCode)
                this.setQRState(State.Done);
        }
        catch (error) {
            this.logger?.error('Client connect error: ', error);
            if (this.displayQRCode)
                this.setQRError(error);
            return;
        }
        if (this.redirect)
            this.openApp();
        try {
            const session = await connectResp.approval();
            this.logger?.debug('Established session:', session);
            this.sessions.push(session);
            this.restorePairings();
            if (this.signClient) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.initKeplrWCClient(this.signClient, {
                    sessionProperties: session.sessionProperties,
                });
            }
        }
        catch (error) {
            this.logger?.error('Session approval error: ', error);
            await this.deleteInactivePairings();
            if (!error) {
                if (this.displayQRCode)
                    this.setQRError(ExpiredError);
                throw new Error('Proposal Expired');
            }
            else if (error.code == 5001) {
                throw RejectedError;
            }
            else {
                throw error;
            }
        }
        finally {
            if (!pairing && this.qrUrl.message !== ExpiredError.message) {
                this.setQRState(State.Init);
            }
        }
    }
    async enable(chainIds) {
        if (!this.keplr) {
            throw new Error('Keplr Wallet is not initialized');
        }
        await this.keplr.enable(chainIds);
    }
    async getSimpleAccount(chainId) {
        if (!this.keplr) {
            throw new Error('Keplr Wallet is not initialized');
        }
        await this.enable(chainId);
        const { address, username } = await this.getAccount(chainId);
        return {
            namespace: 'cosmos',
            chainId,
            address,
            username,
        };
    }
    async getAccount(chainId) {
        if (!this.keplr) {
            throw new Error('Keplr Wallet is not initialized');
        }
        const key = await this.keplr.getKey(chainId);
        return {
            username: key.name,
            address: key.bech32Address,
            algo: key.algo,
            pubkey: key.pubKey,
            isNanoLedger: key.isNanoLedger,
        };
    }
    async getOfflineSigner(chainId, preferredSignType) {
        if (!this.keplr) {
            throw new Error('Keplr Wallet is not initialized');
        }
        switch (preferredSignType) {
            case 'amino':
                return this.getOfflineSignerAmino(chainId);
            case 'direct':
                return this.getOfflineSignerDirect(chainId);
            default:
                return this.getOfflineSignerAmino(chainId);
        }
    }
    getOfflineSignerAmino(chainId) {
        if (!this.keplr) {
            throw new Error('Keplr Wallet is not initialized');
        }
        return this.keplr.getOfflineSignerOnlyAmino(chainId);
    }
    getOfflineSignerDirect(chainId) {
        if (!this.keplr) {
            throw new Error('Keplr Wallet is not initialized');
        }
        return this.keplr.getOfflineSigner(chainId);
    }
    async signAmino(chainId, signer, signDoc, signOptions) {
        if (!this.keplr) {
            throw new Error('Keplr Wallet is not initialized');
        }
        return await this.keplr.signAmino(chainId, signer, signDoc, signOptions);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async signDirect(chainId, signer, signDoc, signOptions) {
        if (!this.keplr) {
            throw new Error('Keplr Wallet is not initialized');
        }
        return await this.keplr.signDirect(chainId, signer, {
            ...signDoc,
            accountNumber: Long.fromString(signDoc.accountNumber?.toString() ?? '0'),
        }, signOptions);
    }
    async signArbitrary(chainId, signer, data) {
        if (!this.keplr) {
            throw new Error('Keplr Wallet is not initialized');
        }
        return await this.keplr.signArbitrary(chainId, signer, data);
    }
}
