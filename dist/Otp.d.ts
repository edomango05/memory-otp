/// <reference types="node" />
import { BinaryToTextEncoding } from "crypto";
export interface OtpInterface {
    password: string;
    expiresAt: Date;
}
export declare class Otp implements OtpInterface {
    readonly password: string;
    readonly expiresAt: Date;
    private retry;
    readonly maxRetries: number;
    constructor(digits: number, durationSeconds: number, maxRetry?: number);
    hashPassword(algorithm?: string, digest?: BinaryToTextEncoding): string;
    isExpired(): boolean;
    addRetry(): boolean;
    Json(): OtpInterface;
}
