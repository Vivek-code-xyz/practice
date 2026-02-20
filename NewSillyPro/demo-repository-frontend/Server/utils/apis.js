export const apis = {
    // Test Routes
    "/api/test": "To test backend APIs are running or not",
    "/api/list": "To get all available API endpoints",

    // Auth Routes
    "/api/auth/register (POST)": "To register your account (* name, email, password)",
    "/api/auth/verify/:token (GET)": "To verify your account with your Gmail!",
    "/api/auth/resend (POST)": "To resend verification link in Gmail (* email)",
    "/api/auth/login (POST)": "To login with your email & password",
    "/api/auth/verify-2fa (POST)": "To verify 2FA code during login (* tempToken, twoFACode)",
    "/api/auth/me (GET)": "To get your account details (Protected)",
    "/api/auth/logout (POST)": "To logout your account (Protected)",

    // User Profile Routes (Protected)
    "/api/users/profile/me (GET)": "Get current user profile",
    "/api/users/profile/activity (GET)": "Get login activity history",
    "/api/users/profile/preferences (PATCH)": "Update user preferences",
    "/api/users/profile/password (PATCH)": "Change password (* currentPassword, newPassword)",

    // 2FA Routes (Protected)
    "/api/users/profile/2fa/enable (POST)": "Enable 2FA - generates QR code",
    "/api/users/profile/2fa/verify (POST)": "Verify 2FA setup (* token)",
    "/api/users/profile/2fa/disable (POST)": "Disable 2FA (* password)",
    "/api/users/profile/2fa/backup-codes (POST)": "Generate new backup codes",

    // Admin Routes (Admin Only)
    "/api/users (GET)": "Get all users (Admin only)",
    "/api/users/stats/overview (GET)": "Get user statistics (Admin only)",

    // User Management 
    "/api/users/:id (GET)": "Get specific user by ID",
    "/api/users/:id (PATCH)": "Update user information",
    "/api/users/:id (DELETE)": "Delete user account"
  }