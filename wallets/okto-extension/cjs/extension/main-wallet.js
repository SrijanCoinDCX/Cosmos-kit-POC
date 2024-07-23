"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OktoExtensionWallet = void 0;
const core_1 = require("@cosmos-kit/core");
const chain_wallet_1 = require("./chain-wallet");
const client_1 = require("./client");
const utils_1 = require("./utils");
class OktoExtensionWallet extends core_1.MainWalletBase {
    constructor(walletInfo) {
        super(walletInfo, chain_wallet_1.ChainOktoExtension);
    }
    async initClient() {
        this.initingClient();
        try {
            const okto = await (0, utils_1.getOktoFromExtension)();
            this.initClientDone(okto ? new client_1.OktoClient(okto) : undefined);
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
exports.OktoExtensionWallet = OktoExtensionWallet;
//# sourceMappingURL=main-wallet.js.map