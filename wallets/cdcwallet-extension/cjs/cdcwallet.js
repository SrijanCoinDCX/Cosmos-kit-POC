"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const extension_1 = require("./extension");
const cdcwalletExtension = new extension_1.CdcwalletExtensionWallet(extension_1.cdcwalletExtensionInfo);
exports.wallets = [cdcwalletExtension];
