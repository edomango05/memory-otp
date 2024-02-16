# Memory Otp

this lightweigth project manages otp system for you without databases. Just make an OtpManager instance and let it work!

# Usage

there are 2 scenarios:
- memory managed otp
```typescript
import OtpManager from "OtpManager"

const otp_digits = 5;
const otp_durationSeconds = 60;
const otp_maxReties = 60; // not required 

const manager = new OtpManager(otp_digits, otp_durationSeconds,otp_maxReties)
```
- database managed otp which makes only the otp object and lets you handle the otp auth.
```typescript
import Otp from "Otp"

const otp_digits = 5;
const otp_durationSeconds = 60;
const otp_maxReties = 60; // not required 

const otp = new Otp(otp_digits, otp_durationSeconds,otp_maxReties)
```

