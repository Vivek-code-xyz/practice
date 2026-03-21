# Week1 - Registration System

## Day One: Register

This project implements a user registration system with a modern frontend and backend.

### Project Structure

```
Week1/
├── backend/                 # Express.js Backend
│   ├── index.js            # Main server entry point
│   ├── package.json        # Backend dependencies
│   └── src/
│       ├── config/
│       │   └── MongoDB.js  # MongoDB connection
│       ├── controllers/
│       │   └── authController.js  # Registration logic
│       ├── middleware/
│       │   └── validateUser.js    # Input validation
│       ├── models/
│       │   └── User.js    # Mongoose user model
│       ├── routes/
│       │   └── authRouter.js  # Auth routes
│       └── utils/
│           └── hashPassword.js  # Password hashing
│
└── frontend/               # React + Vite Frontend
    ├── src/
    │   ├── pages/
    │   │   └── Register.jsx  # Registration page
    │   ├── App.jsx          # Main app component
    │   └── main.jsx         # Entry point
    └── package.json
```

### How Register Works

#### Flow Diagram
```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│   Frontend      │ ──► │    Backend API   │ ──► │    MongoDB       │
│  (Register.jsx) │      │  (Express.js)    │      │   (Database)    │
└─────────────────┘      └──────────────────┘      └─────────────────┘
        │                         │
        │ POST /api/auth/register│
        │ {username, email,      │
        │  password}             │
        │                        │
        ▼                        ▼
  1. User fills form     2. Request hits validateUser middleware
  2. Validates inputs     3. validateUser checks:
  3. Sends to backend       - All fields required
                            - Valid email format
                            - Strong password (8+ chars, uppercase, lowercase, number, special char)
                            - Username length (3-25 chars)
  4. Password hashed       4. If valid, hashPassword utility encrypts the password
  5. User created         5. User.create() saves to MongoDB
  6. Success response     6. Returns {success: true, message: "User Registered Successfully"}
```

### API Endpoint

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |

#### Request Body
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

#### Success Response (200)
```json
{
  "success": true,
  "message": "User Registered Successfully"
}
```

#### Error Responses (400/500)
```json
{
  "success": false,
  "message": "All Fields Are Required"
}
```

### Validation Rules

| Field | Rules |
|-------|-------|
| Username | Required, 3-25 characters |
| Email | Required, valid email format, unique |
| Password | Required, min 6 characters, strong password |

### Running the Project

#### Backend
```bash
cd backend
npm install
# Create .env file with DB_CONNECT_URL and PORT
npm start
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Features

- ✅ User Registration
- ✅ Input Validation (Frontend & Backend)
- ✅ Password Hashing (bcrypt)
- ✅ Email Validation
- ✅ Password Strength Indicator
- ✅ Show/Hide Password
- ✅ Form Validation with react-hook-form
- ✅ Toast Notifications
- ✅ Modern UI with Tailwind CSS
- ✅ Animated Background
- ✅ Responsive Design
