"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Otp = void 0;
const crypto_1 = require("crypto");
const charList = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
class Otp {
    constructor(digits, durationSeconds, maxRetry) {
        this.password = "";
        this.retry = 0;
        this.expiresAt = new Date((new Date().getTime()) + durationSeconds * 1000);
        this.maxRetries = maxRetry || 100;
        while (this.password.length < digits) {
            this.password += charList[(0, crypto_1.randomInt)(0, charList.length)];
        }
    }
    hashPassword(algorithm = "sha256", digest = "hex") {
        const hash = (0, crypto_1.createHash)(algorithm);
        return hash.update(this.password).digest(digest);
    }
    isExpired() {
        const now = (new Date()).getTime();
        return now - this.expiresAt.getTime() < 0;
    }
    addRetry() {
        this.retry += 1;
        return this.maxRetries - this.retry > 0;
    }
    Json() {
        return {
            password: this.password,
            expiresAt: this.expiresAt,
        };
    }
}
exports.Otp = Otp;
