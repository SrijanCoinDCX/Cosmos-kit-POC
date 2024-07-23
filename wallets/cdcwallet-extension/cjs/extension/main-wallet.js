"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdcwalletExtensionWallet = void 0;
const core_1 = require("@cosmos-kit/core");
const chain_wallet_1 = require("./chain-wallet");
const client_1 = require("./client");
const utils_1 = require("./utils");
class CdcwalletExtensionWallet extends core_1.MainWalletBase {
    constructor(walletInfo) {
        super(walletInfo, chain_wallet_1.ChainCdcwalletExtension);
    }
    async initClient() {
        this.initingClient();
        try {
            const cdcwallet = await (0, utils_1.getCdcwalletFromExtension)();
            this.initClientDone(cdcwallet ? new client_1.CdcwalletClient(cdcwallet) : undefined);
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
exports.CdcwalletExtensionWallet = CdcwalletExtensionWallet;
