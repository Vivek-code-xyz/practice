# Phluxo Server

A secure authentication and user management API built with Node.js, Express, and MongoDB.

## Features

- 🔐 **User Authentication** - Register, login, email verification
- 🔒 **Two-Factor Authentication (2FA)** - TOTP-based with backup codes
- 👤 **User Management** - Profile updates, password changes
- 🛡️ **Security** - Rate limiting, account lockout, JWT tokens
- 📧 **Email Integration** - Gmail SMTP for verification emails

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT, Speakeasy (2FA)
- **Email**: Nodemailer with Gmail

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
BASE_URL=http://localhost:5000
GMAIL_USER=your_email@gmail.com
GMAIL_PASS=your_app_specific_password
```

### 3. Run the Server
```bash
npm run dev
```

Server runs at `http://localhost:5000`

## API Endpoints

### Authentication (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| GET | `/api/auth/verify/:token` | Verify email |
| POST | `/api/auth/resend` | Resend verification |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/verify-2fa` | Verify 2FA code |

### Authentication (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/logout` | Logout |

### User Profile (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/profile/me` | Get profile |
| GET | `/api/users/profile/activity` | Login history |
| PATCH | `/api/users/profile/preferences` | Update preferences |
| PATCH | `/api/users/profile/password` | Change password |

### 2FA Management (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/profile/2fa/enable` | Enable 2FA |
| POST | `/api/users/profile/2fa/verify` | Verify 2FA setup |
| POST | `/api/users/profile/2fa/disable` | Disable 2FA |
| POST | `/api/users/profile/2fa/backup-codes` | New backup codes |

### Admin (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/stats/overview` | User statistics |

### User Management (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/:id` | Get user by ID |
| PATCH | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

## Usage Examples

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"Pass123!"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"Pass123!"}'
```

### Access Protected Route
```bash
curl -X GET http://localhost:5000/api/users/profile/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Project Structure

```
server/
├── config/           # Database & email config
├── controllers/      # Route handlers
├── middlewares/      # Auth & rate limiting
├── models/           # MongoDB schemas
├── routes/           # API routes
├── utils/            # Helper functions
├── .agent/workflows/ # API documentation
├── server.js         # Entry point
└── package.json
```

## Security Features

- **httpOnly Cookies** - Tokens stored in secure cookies, not accessible via JavaScript
- **No Token in Response** - Tokens never returned in API response body
- **Secure Cookie Flags** - `httpOnly`, `secure` (HTTPS), `sameSite: strict`
- **JWT Tokens** - 7-day expiration, signed with secret
- **Rate Limiting** - 50 requests/15 min per IP
- **Account Lockout** - 5 failed attempts → 2hr lock
- **Password Hashing** - Bcrypt with salt
- **2FA** - TOTP with 8 single-use backup codes
- **XSS Protection** - Tokens cannot be stolen via JavaScript
- **CSRF Protection** - `sameSite: strict` prevents cross-site requests

## Workflows

Detailed API documentation available in `.agent/workflows/`:
- `authentication.md` - Auth flow guide
- `2fa.md` - 2FA setup guide
- `auth-requirements.md` - Token requirements

## License

MIT
