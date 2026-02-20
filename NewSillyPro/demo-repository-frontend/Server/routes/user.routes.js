import express from "express";
import { getAllUsers, getUser, updateUser, deleteUser, getCurrentUser, getUserStats, getLoginActivity,  updatePreferences, changePassword, generateBackupCodes, disable2FA, verify2FASetup, enable2FA } from "../controllers/user.controller.js";
import { protect, adminOnly, authLimiter } from "../middlewares/authmiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.use(authLimiter);
router.use(protect);

router.get("/profile/me", getCurrentUser);
router.get("/profile/activity", getLoginActivity);
router.patch("/profile/preferences", updatePreferences);
router.patch("/profile/password", changePassword);

router.post("/profile/2fa/enable", enable2FA);
router.post("/profile/2fa/verify", verify2FASetup);
router.post("/profile/2fa/disable", disable2FA);
router.post("/profile/2fa/backup-codes", generateBackupCodes);

router.get("/", adminOnly, getAllUsers);
router.get("/stats/overview", adminOnly, getUserStats);

router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;