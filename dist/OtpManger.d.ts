import { Otp } from "./Otp";
export declare class OtpManager extends Map<string, Otp> {
    private digits;
    private durationSeconds;
    private maxReties?;
    constructor(digits: number, durationSeconds: number, maxRetries?: number);
    addOtp(id: string): void;
    removeOtp(id: string): boolean;
    validate(id: string, password: string): boolean;
}
