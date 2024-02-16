"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpManager = void 0;
const Otp_1 = require("./Otp");
var OtpError;
(function (OtpError) {
    OtpError["AldreadyExists"] = "Otp is already in query";
    OtpError["WrongPassword"] = "Wrong password was passed";
    OtpError["NotFound"] = "Otp session not found";
    OtpError["Expired"] = "Otp session expired";
    OtpError["TooManyAttempts"] = "Too many Otp attempts";
})(OtpError || (OtpError = {}));
class OtpException extends Error {
    constructor(ex) {
        super(ex);
        this.name = "";
        this.stack = "";
    }
}
class OtpManager extends Map {
    constructor(digits, durationSeconds, maxRetries) {
        super();
        this.maxReties = maxRetries;
        this.digits = digits;
        this.durationSeconds = durationSeconds;
        setInterval(() => {
            for (const [id, otp] of this.entries()) {
                if (otp.isExpired()) {
                    this.removeOtp(id);
                }
            }
        }, 2000);
    }
    addOtp(id) {
        if (this.get(id)) {
            throw new OtpException(OtpError.AldreadyExists);
        }
        this.set(id, new Otp_1.Otp(this.digits, this.durationSeconds, this.maxReties));
    }
    removeOtp(id) {
        return this.delete(id);
    }
    validate(id, password) {
        const value = this.get(id);
        if (!value) {
            throw new OtpException(OtpError.NotFound);
        }
        if (value.password !== password) {
            if (value.addRetry()) {
                this.removeOtp(id);
                throw new OtpException(OtpError.TooManyAttempts);
            }
            throw new OtpException(OtpError.WrongPassword);
        }
        if (value.isExpired()) {
            this.removeOtp(id);
            throw new OtpException(OtpError.Expired);
        }
        return this.removeOtp(id);
    }
}
exports.OtpManager = OtpManager;
