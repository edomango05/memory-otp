"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpManager = void 0;
//requiring otp class from the project
const Otp_1 = require("./Otp");
//this is the equivalent of an ENUM class in typescript
//Usefull for error handling and typing
var OtpError;
(function (OtpError) {
    OtpError["AldreadyExists"] = "Otp is already in query";
    OtpError["WrongPassword"] = "Wrong password was passed";
    OtpError["NotFound"] = "Otp session not found";
    OtpError["Expired"] = "Otp session expired";
    OtpError["TooManyAttempts"] = "Too many Otp attempts";
})(OtpError || (OtpError = {}));

//making a child class for a specific Otp error 
class OtpException extends Error {
    constructor(ex) {
        //calling parent Error() contructor
        super(ex);
        this.name = "";
        this.stack = "";
    }
}

//this class manages OTPs and extends js Maps
class OtpManager extends Map {
    constructor(digits, durationSeconds, maxRetries) {
        //calling Map constructor
        super();
        //setting instance attribute
        this.maxReties = maxRetries;
        this.digits = digits;
        this.durationSeconds = durationSeconds;
        //executes code each 2 seconds 
        setInterval(() => {
            //loop through all OTPs from all map entries
            for (const [id, otp] of this.entries()) {
                //checks if OTP token is expired
                if (otp.isExpired()) {
                    //destroys OTP
                    this.removeOtp(id);
                }
            }
        }, 2000);
    }
    addOtp(id) {
        //checks if OTP already exists
        if (this.get(id)) {
            throw new OtpException(OtpError.AldreadyExists);
        }
        //creates a new otp with the specified id
        this.set(id, new Otp_1.Otp(this.digits, this.durationSeconds, this.maxReties));
    }
    removeOtp(id)
        return this.delete(id);
    }
    //checks if OTP is valid
    validate(id, password) {
        //checking if exists 
        const value = this.get(id);
        if (!value) {
            throw new OtpException(OtpError.NotFound);
        }
        //checks if password is correct
        if (value.password !== password) {
            //adds a retried attempt and checks if reached a maximum value of attempts
            if (value.addRetry()) {
                this.removeOtp(id);
                throw new OtpException(OtpError.TooManyAttempts);
            }
            throw new OtpException(OtpError.WrongPassword);
        }
        //cheks if expired
        if (value.isExpired()) {
            this.removeOtp(id);
            throw new OtpException(OtpError.Expired);
        }
        return this.removeOtp(id);
    }
}
//exporting class
exports.OtpManager = OtpManager;
