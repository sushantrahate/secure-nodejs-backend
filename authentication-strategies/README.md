# Authentication Strategies

This project showcases secure login strategies for Node.js using ```typescript, implementing multiple security techniques to safeguard user credentials, sessions, and account access.

## Key Security Features

### 1. Password Hashing with Salt

Passwords are hashed using a strong hashing algorithm (e.g., bcrypt) along with a random salt for each password. This ensures that even if the hashed password is compromised, it cannot easily be reversed into the original password.

**Why its important**:

- Prevents plain-text password storage.
- Salting makes it difficult for attackers to use precomputed hash tables (rainbow tables) to guess passwords.

Implementation:

```typescript
import bcrypt from 'bcrypt';

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};
```

### 2. Token-Based Authentication

JWT (JSON Web Token) is used for token-based authentication, allowing stateless authentication between the client and server. Users receive a JWT upon login, which is then sent with every subsequent request in the Authorization header.

**Why its important:**

Stateless: No need for session storage on the server.
Secure token can carry claims (user ID, roles) without exposing sensitive information.

Implementation:

```typescript
import jwt from 'jsonwebtoken';

const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
```

### 3. Refresh Tokens

A refresh token is used to obtain new access tokens without requiring the user to log in again. This ensures a smooth experience for users without compromising security.

**Why its important:**

Limits exposure of short-lived access tokens.
Refresh tokens are stored more securely (e.g., in a database or HTTP-only cookie).

Implementation:

```typescript
const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.REFRESH_SECRET, { expiresIn: '7d' });
};
```

### 4. HTTP-Only Cookies

Store sensitive tokens such as refresh tokens in HTTP-only cookies. This prevents JavaScript from accessing the tokens, protecting them from XSS (Cross-Site Scripting) attacks.

**Why its important:**

Shields tokens from being stolen by malicious scripts.
Reduces the risk of token exposure through client-side code.

Implementation:

```typescript
res.cookie('refreshToken', refreshToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
});
```

### 5. JWT Blacklisting

JWT tokens do not have built-in revocation. To invalidate tokens (e.g., on logout), JWT blacklisting is used. A database or Redis is used to store invalidated tokens until they expire.

**Why its important:**

Prevents previously issued tokens from being used after logout or account compromise.

Implementation:

```typescript
const blacklistToken = async (token: string) => {
  await redisClient.set(token, 'blacklisted', 'EX', tokenExpirationTime);
};
```

### 6. Single Session at a Time

Ensure that only one session is active for a user at any given time. When a new session is created, invalidate previous tokens or sessions.

**Why its important:**

Prevents concurrent logins from multiple devices or locations, enhancing account security.

Implementation:

```typescript
// Schema for User table:
sessionId: { type: String, unique: true }

//login API
const newSessionId = generateAccessToken(user);
user.sessionId = newSessionId;
await user.save();

// Auth API
const decodedToken: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!); // Replace with your JWT secret key
const sessionIdFromToken = decodedToken.sessionId;

if (user.sessionId !== sessionIdFromToken) {
      return res.status(403).json({ message: 'Session invalidated. You are logged in elsewhere.' });
    }
```

### 7. Ideal Time Session Expiration

Sessions expire after a period of inactivity. Implement a session expiration timer to automatically log out users who are inactive for a predefined time.

**Why its important:**

Reduces the risk of an unauthorized person accessing the session if the user forgets to log out.
Implementation:

```typescript
const sessionExpirationTime = 15 _ 60 _ 1000; // 15 minutes
```

### 8. Account Lockout Mechanism

Prevent brute force attacks by locking out accounts after several failed login attempts. Implement time-based lockout, where accounts are temporarily locked after repeated failures.

**Why its important:**

Mitigates brute force attacks by limiting login attempts.
Implementation:

```typescript
// Schema
failedLoginAttempts: { type: Number, default: 0 },
lockoutUntil: { type: Date, default: null }, // Track lockout time

const MAX_ATTEMPTS = 3;
const LOCK_TIME = 15 * 60 \_ 1000; // 15 minutes
// Example for MongoDB with Mongoose
const handleFailedLogin = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) return false;

  if (user.lockoutUntil && user.lockoutUntil > new Date()) {
    return true; // Account is still locked
  }

  user.failedLoginAttempts += 1;

  if (user.failedLoginAttempts >= MAX_ATTEMPTS) {
    user.lockoutUntil = new Date(Date.now() + LOCK_TIME); // Lock for 30 mins
  }

  await user.save();
  return user.lockoutUntil && user.lockoutUntil > new Date(); // Return if account is locked
};

// Reset login attempts if the login is successful

```

### 9. Secure Password Reset Procedures

Users can reset their passwords through a secure process. Use a time-limited, one-time token (OTP) sent to the user's email for the reset process. Ensure the reset token expires after a short period.

**Why its important:**

Provides users a secure way to recover accounts without compromising security.
Implementation:

```typescript
const generateResetToken = () => {
  return crypto.randomBytes(20).toString('hex');
};
```

### 10. Password Expiration and Restricting Past 3 Passwords

Here's how this works:

1. **Password History:**

   - The system stores the last three hashed passwords in a user's password history.
   - When a user attempts to set a new password, the system compares the new password against these previous passwords to prevent reuse.

2. **Password Expiration:**
   - The system tracks how long a user has been using their current password.
   - After a set period (e.g., 1 month), the system sends a notification prompting the user to change their password.
   - If the password is not updated within a given grace period, access may be restricted until a new password is set.

```typescript
// Schema
passwordHistory: [{ type: String }], // Array to store past 3 password hashes
passwordUpdatedAt: { type: Date, default: Date.now }, // When the password was last updated

// You can Check Expiration on Login or have a corn job to find and notify users via email.
```

### 11. Cross-Origin Resource Sharing (CORS) Configuration

Configure CORS to restrict which origins are allowed to access the API. Only trusted domains should be allowed to send requests to your server.

**Why its important:**

Prevents unauthorized sites from making requests to your server.
Protects against CSRF (Cross-Site Request Forgery) attacks.
Implementation:

```typescript
import cors from 'cors';

app.use(
  cors({
    origin: 'https://your-frontend-domain.com',
    credentials: true,
  })
);
```

If you liked it then please show your love by ⭐ the repo