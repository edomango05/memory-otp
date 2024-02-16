import { randomInt, createHash, BinaryToTextEncoding } from "crypto"

const charList = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export interface OtpInterface {
    password: string;
    expiresAt: Date;
}

export class Otp implements OtpInterface {

    public readonly password: string = "";
    public readonly expiresAt: Date;
    private retry: number = 0;
    public readonly maxRetries: number;
    constructor(digits: number, durationSeconds: number, maxRetry?:number) {
        this.expiresAt = new Date((new Date().getTime()) + durationSeconds * 1000)
        this.maxRetries = maxRetry || 100;
        while (this.password.length < digits) {
            this.password += charList[randomInt(0, charList.length)]
        }
    }

    hashPassword(algorithm: string = "sha256", digest: BinaryToTextEncoding = "hex") {
        const hash = createHash(algorithm)
        return hash.update(this.password).digest(digest)
    }
    
    isExpired() { 
        const now = (new Date()).getTime()
        return now - this.expiresAt.getTime() < 0
    }

    addRetry() { 
        this.retry += 1;
        return this.maxRetries - this.retry > 0;
    }
    
    Json() : OtpInterface { 
        return {
            password : this.password, 
            expiresAt: this.expiresAt,
        }
    }
}
