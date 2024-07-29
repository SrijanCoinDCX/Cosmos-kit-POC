"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const extension_1 = require("./extension");
const oktoExtension = new extension_1.OktoExtensionWallet(extension_1.oktoExtensionInfo);
exports.wallets = [oktoExtension];
