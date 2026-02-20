import express from "express";
import {
  // Authentication
  registerUser,
  verifyEmail,
  loginUser,
  resendVerificationEmail,
  getMe,
  logoutUser,
  verify2FALogin,
  verifyLoginOTP,
  refreshToken,
  requestPasswordReset,
  resetPassword,

  // User Profile
  updateProfile,
  changePassword,
  getLoginActivity,
  updatePreferences,

  // 2FA Management
  enable2FA,
  verify2FASetup,
  disable2FA,
  generateBackupCodes,

  // Session Management
  getActiveSessions,
  revokeSession,
  revokeAllSessions,

  // Device Management
  getTrustedDevices,
  removeTrustedDevice,

  // Security Logs
  getSecurityLogs,

  // Account Management
  deactivateAccount,

  // Admin Routes
  getAllUsers,
  getUserStats,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/auth.controller.js";

import { protect, authorize, requireVerification, authLimiter } from "../middlewares/authmiddleware.js";
import { makeFirstUserAdmin } from "../middlewares/firstuser.js";

const router = express.Router();

// Apply rate limiting to auth routes
router.use(authLimiter);

// ====== AUTHENTICATION ROUTES ======

// Public routes
router.post("/register", makeFirstUserAdmin, registerUser);
router.get("/verify/:token", verifyEmail);
router.post("/resend", resendVerificationEmail);
router.post("/login", loginUser);
router.post("/verify-2fa", verify2FALogin);
router.post("/refresh", refreshToken);
router.post("/password/reset/request", requestPasswordReset);
router.post("/password/reset/:token", resetPassword);
router.post("/login/verify-otp", verifyLoginOTP);

// Protected routes
router.get("/me", protect, getMe);
router.post("/logout", protect, logoutUser);

// ====== USER PROFILE ROUTES ======

router.get("/users/profile/me", protect, getMe);
router.get("/users/profile/activity", protect, getLoginActivity);
router.patch("/users/profile/preferences", protect, updatePreferences);
router.patch("/users/profile/password", protect, changePassword);
router.patch("/users/profile/update", protect, updateProfile);

// ====== 2FA ROUTES ======

router.post("/users/profile/2fa/enable", protect, enable2FA);
router.post("/users/profile/2fa/verify", protect, verify2FASetup);
router.post("/users/profile/2fa/disable", protect, disable2FA);
router.post("/users/profile/2fa/backup-codes", protect, generateBackupCodes);

// ====== SESSION MANAGEMENT ======

router.get("/users/sessions", protect, getActiveSessions);
router.delete("/users/sessions/:sessionId", protect, revokeSession);
router.delete("/users/sessions", protect, revokeAllSessions);

// ====== DEVICE MANAGEMENT ======

router.get("/users/devices", protect, getTrustedDevices);
router.delete("/users/devices/:deviceId", protect, removeTrustedDevice);

// ====== SECURITY LOGS ======

router.get("/users/security/logs", protect, getSecurityLogs);

// ====== ACCOUNT MANAGEMENT ======

router.post("/users/account/deactivate", protect, deactivateAccount);

// ====== ADMIN ROUTES ======

router.get("/admin/users", protect, authorize('admin'), getAllUsers);
router.get("/admin/users/stats", protect, authorize('admin'), getUserStats);
router.get("/admin/users/:id", protect, authorize('admin'), getUserById);
router.patch("/admin/users/:id", protect, authorize('admin'), updateUser);
router.delete("/admin/users/:id", protect, authorize('admin'), deleteUser);

export default router;