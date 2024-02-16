import { Otp } from "./OTP";

enum OtpError {
    AldreadyExists = "Otp is already in query",
    WrongPassword = "Wrong password was passed",
    NotFound = "Otp session not found",
    Expired = "Otp session expired",
    TooManyAttempts = "Too many Otp attempts",
}

class OtpException extends Error { 
    constructor(ex:OtpError){
        super(ex)
        this.name = ""
        this.stack = ""
    }
}


export class OtpManager extends Map<string, Otp> {
    private digits: number;
    private durationSeconds: number;

    constructor(digits: number, durationSeconds: number) {
        super();
        this.digits = digits; 
        this.durationSeconds = durationSeconds;

        setInterval(()=> {
            for (const [id , otp] of this.entries()) {
                if (otp.isExpired()) { 
                    this.removeOtp(id)
                }
            }
        }, 2000)

    }
    addOtp(id: string) {
        if ( this.get(id) ) {
            throw new OtpException(OtpError.AldreadyExists);
        }
        this.set(id, new Otp(this.digits,this.durationSeconds))
    }

    removeOtp(id : string) {
        return this.delete(id);
    }

    validate(id : string, password:string) {
        const value = this.get(id);

        if ( !value )
        {
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