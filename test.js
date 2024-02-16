const {Otp} = require("./dist/index")

const otp_digits = 10;
const otp_durationSeconds = 60;
const otp_maxReties = 60; // not required 

const otp = new Otp(otp_digits, otp_durationSeconds,otp_maxReties)

console.log(otp.password)

console.log(otp.hashPassword())