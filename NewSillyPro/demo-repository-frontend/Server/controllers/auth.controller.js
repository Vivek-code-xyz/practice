import User from "../models/User.js";
import AuditLog from "../models/Auditlog.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { mailer } from "../config/mailer.js";
import { getClientIP } from "../utils/ip.js";
import { getLocationFromIP } from "../utils/location.js";
import { getDeviceId } from "../utils/device.js";
import speakeasy from 'speakeasy';
import Joi from 'joi';
import Session from "../models/Session.js";
import RefreshToken from "../models/RefreshToken.js";
import TokenBlacklist from "../models/TokenBlacklist.js";
import { redisClient } from "../config/redis.js";

// Generate tokens
const generateToken = (payload, expiresIn = "15m") => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString('hex');
};

// Email Templates
const sendVerificationEmail = async (user, verificationToken) => {
  try {
    const verifyLink = `${process.env.BASE_URL}/api/auth/verify/${verificationToken}`;

    const emailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #2563eb; margin: 0;">Phluxo</h2>
          <p style="color: #6b7280; margin: 5px 0;">Your Personal Productivity Suite</p>
        </div>
        
        <h3 style="color: #1f2937;">Welcome to Phluxo, ${user.name}! 👋</h3>
        
        <p style="color: #4b5563; line-height: 1.6;">
          Thank you for registering with Phluxo. To get started and unlock all features, 
          please verify your email address by clicking the button below:
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verifyLink}" 
             style="background-color: #2563eb; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; 
                    display: inline-block; font-weight: bold; font-size: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            Verify Email Address
          </a>
        </div>
        
        <p style="color: #6b7280; font-size: 14px; text-align: center;">
          Or copy and paste this link in your browser:<br>
          <a href="${verifyLink}" style="color: #2563eb; word-break: break-all;">${verifyLink}</a>
        </p>
        
        <div style="margin-top: 30px; padding: 15px; background-color: #f3f4f6; border-radius: 6px;">
          <p style="color: #dc2626; margin: 0; font-size: 14px;">
            <strong>⚠️ Important:</strong> This verification link will expire in 24 hours.
          </p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;">
        
        <div style="text-align: center;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            If you didn't create an account with Phluxo, please ignore this email.<br>
            This is an automated message, please do not reply to this email.
          </p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"Phluxo Team" <${process.env.GMAIL_USER}>`,
      to: user.email,
      subject: "Verify Your Phluxo Account",
      html: emailTemplate,
    };

    const result = await mailer.sendMail(mailOptions);
    console.log(`✅ Verification email sent to ${user.email}:`, result.messageId);

    // Log to audit log
    await AuditLog.create({
      userId: user._id,
      action: "verification_email_sent",
      metadata: { email: user.email }
    });

    return result;

  } catch (error) {
    console.error(`Failed to send verification email to ${user.email}:`, error);
    await AuditLog.create({
      userId: user._id,
      action: "email_send_failed",
      metadata: { email: user.email, error: error.message }
    });

    // In production, email failure might be critical. In dev/demo, log and continue.
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`Failed to send verification email: ${error.message}`);
    }
    console.log('⚠️ Email sending failed but continuing registration (Dev Mode)');
  }
};

const sendPasswordResetEmail = async (user, resetToken) => {
  try {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const emailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #2563eb; margin: 0;">Phluxo</h2>
          <p style="color: #6b7280; margin: 5px 0;">Password Reset Request</p>
        </div>
        
        <h3 style="color: #1f2937;">Hello ${user.name},</h3>
        
        <p style="color: #4b5563; line-height: 1.6;">
          We received a request to reset your password. Click the button below to create a new password:
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" 
             style="background-color: #2563eb; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; 
                    display: inline-block; font-weight: bold; font-size: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            Reset Password
          </a>
        </div>
        
        <p style="color: #6b7280; font-size: 14px; text-align: center;">
          Or copy and paste this link in your browser:<br>
          <a href="${resetLink}" style="color: #2563eb; word-break: break-all;">${resetLink}</a>
        </p>
        
        <div style="margin-top: 30px; padding: 15px; background-color: #f3f4f6; border-radius: 6px;">
          <p style="color: #dc2626; margin: 0; font-size: 14px;">
            <strong>⚠️ Important:</strong> This link will expire in 10 minutes for security reasons.
          </p>
          <p style="color: #4b5563; margin: 10px 0 0 0; font-size: 14px;">
            If you didn't request a password reset, please ignore this email or contact our support team immediately.
          </p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;">
        
        <div style="text-align: center;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            This is an automated security message from Phluxo.<br>
            Please do not reply to this email.
          </p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"Phluxo Security" <${process.env.GMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset Request - Phluxo",
      html: emailTemplate,
    };

    const result = await mailer.sendMail(mailOptions);
    console.log(`✅ Password reset email sent to ${user.email}:`, result.messageId);

    // Log to audit log
    await AuditLog.create({
      userId: user._id,
      action: "password_reset_requested",
      ip: getClientIP({}),
      metadata: { email: user.email }
    });

    return result;

  } catch (error) {
    console.error(`Failed to send password reset email to ${user.email}:`, error);
    await AuditLog.create({
      userId: user._id,
      action: "password_reset_email_failed",
      metadata: { email: user.email, error: error.message }
    });
    throw new Error(`Failed to send password reset email: ${error.message}`);
  }
};

const sendSecurityAlertEmail = async (user, location, deviceInfo, alertType = "new_login") => {
  try {
    let subject, title, description, actions;

    switch (alertType) {
      case "new_login":
        subject = "New Login Detected - Phluxo";
        title = "New Login Detected";
        description = "We detected a new login to your Phluxo account from an unrecognized device or location.";
        actions = [
          "Change your password immediately if you don't recognize this activity",
          "Review your recent account activity",
          "Enable two-factor authentication if not already enabled"
        ];
        break;
      case "password_changed":
        subject = "Password Changed - Phluxo";
        title = "Password Changed Successfully";
        description = "Your Phluxo account password has been changed successfully.";
        actions = [
          "If you made this change, no further action is needed",
          "If you didn't change your password, reset it immediately",
          "Contact support if you suspect unauthorized access"
        ];
        break;
      case "suspicious_activity":
        subject = "Suspicious Activity Detected - Phluxo";
        title = "Suspicious Activity Detected";
        description = "We detected suspicious activity on your Phluxo account.";
        actions = [
          "Review your account activity immediately",
          "Change your password if you see unrecognized activity",
          "Enable two-factor authentication for added security"
        ];
        break;
      default:
        subject = "Security Alert - Phluxo";
        title = "Security Alert";
        description = "We detected security-related activity on your Phluxo account.";
        actions = [
          "Review your account security settings",
          "Change your password if needed",
          "Contact support for assistance"
        ];
    }

    const emailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #dc2626; margin: 0;">🔒 Security Alert</h2>
          <p style="color: #6b7280; margin: 5px 0;">${title}</p>
        </div>
        
        <h3 style="color: #1f2937;">Hello ${user.name},</h3>
        
        <p style="color: #4b5563; line-height: 1.6;">
          ${description}
        </p>
        
        ${deviceInfo || location ? `
        <div style="background-color: #fef2f2; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="color: #7f1d1d; margin: 5px 0;">
            ${deviceInfo ? `<strong>📱 Device:</strong> ${deviceInfo}<br>` : ''}
            ${location ? `<strong>📍 Location:</strong> ${location}<br>` : ''}
            <strong>⏰ Time:</strong> ${new Date().toLocaleString()}
          </p>
        </div>
        ` : ''}
        
        <p style="color: #4b5563; line-height: 1.6;">
          Recommended actions:
        </p>
        
        <ol style="color: #4b5563; line-height: 1.8;">
          ${actions.map(action => `<li>${action}</li>`).join('')}
        </ol>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.FRONTEND_URL}/security" 
             style="background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; 
                    display: inline-block; font-weight: bold; font-size: 14px;">
            Review Account Security
          </a>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;">
        
        <div style="text-align: center;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            This is an automated security message from Phluxo.<br>
            If you have any concerns, please contact our support team immediately.
          </p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"Phluxo Security" <${process.env.GMAIL_USER}>`,
      to: user.email,
      subject: subject,
      html: emailTemplate,
    };

    await mailer.sendMail(mailOptions);
    console.log(`✅ Security alert sent to ${user.email}`);

    // Log to audit log
    await AuditLog.create({
      userId: user._id,
      action: "security_alert_sent",
      metadata: { alertType, location, deviceInfo }
    });

  } catch (error) {
    console.error(`Failed to send security alert to ${user.email}:`, error);
    await AuditLog.create({
      userId: user._id,
      action: "security_alert_failed",
      metadata: { alertType, error: error.message }
    });
  }
};

// Validation schemas
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required()
    .messages({
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    }),
  role: Joi.string().valid('user', 'admin').optional()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  deviceId: Joi.string().optional()
});

const verify2FASchema = Joi.object({
  email: Joi.string().email().required(),
  token: Joi.string().length(6).required()
});

const resetPasswordSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required()
    .messages({
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    })
});

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required()
    .messages({
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    })
});

const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(50),
  bio: Joi.string().max(500).allow(''),
  avatar: Joi.string().uri().allow(''),
  preferences: Joi.object({
    theme: Joi.string().valid('light', 'dark', 'auto'),
    language: Joi.string().valid('en', 'es', 'fr', 'de', 'pt', 'it', 'ru', 'zh', 'ja', 'ko', 'ar'),
    emailNotifications: Joi.object({
      security: Joi.boolean(),
      marketing: Joi.boolean(),
      updates: Joi.boolean(),
      loginAlerts: Joi.boolean()
    })
  })
});

// Generate device fingerprint (server-side only)
const generateDeviceFingerprint = (req) => {
  const components = [
    req.headers['user-agent'] || '',
    req.headers['accept-language'] || '',
    req.headers['sec-ch-ua-platform'] || '',
    req.headers['sec-ch-ua'] || '',
  ];

  return crypto
    .createHash('sha256')
    .update(components.join('|') + process.env.DEVICE_SALT)
    .digest('hex')
    .substring(0, 32);
};

// Rate limiting helper
const checkRateLimit = async (key, maxAttempts, windowMs) => {
  const current = await redisClient.get(key);
  if (current && parseInt(current) >= maxAttempts) {
    throw new Error('RATE_LIMITED');
  }

  const multi = redisClient.multi();
  multi.incr(key);
  multi.expire(key, windowMs / 1000);
  await multi.exec();

  return parseInt(current || 0) + 1;
};

// Secure password comparison with timing attack protection
const securePasswordComparison = async (email, inputPassword) => {
  const dummyHash = await bcrypt.hash("dummy", 10);

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      // Use dummy comparison to maintain consistent timing
      await bcrypt.compare(inputPassword, dummyHash);
      return {
        success: false,
        message: "Invalid credentials",
        code: "INVALID_CREDENTIALS"
      };
    }

    const isMatch = await user.matchPassword(inputPassword);

    if (!isMatch) {
      return {
        success: false,
        message: "Invalid credentials",
        code: "INVALID_CREDENTIALS",
        user
      };
    }

    return { success: true, user };
  } catch (error) {
    // Maintain consistent timing even on errors
    await bcrypt.compare(inputPassword, dummyHash);
    return {
      success: false,
      message: "Authentication error",
      code: "AUTH_ERROR"
    };
  }
};

// Register Controller
export const registerUser = async (req, res) => {
  try {
    // Rate limiting
    const ip = getClientIP(req);
    const attempts = await checkRateLimit(`register:${ip}`, 5, 3600000); // 5 per hour

    // Input validation
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
        code: "VALIDATION_ERROR"
      });
    }

    const { name, email, password } = value;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
        code: "USER_EXISTS"
      });
    }

    // Determine role (first user is admin)
    const userCount = await User.countDocuments();
    const role = userCount === 0 ? "admin" : (value.role || "user");

    // Create verification token
    const verificationToken = generateToken({ email }, "24h");

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      verificationToken,
      role,
      signupSource: req.headers['origin'] || 'api'
    });

    // Generate embeddings
    await user.generateAllEmbeddings();

    // Send verification email
    await sendVerificationEmail(user, verificationToken);

    // Log to audit log
    await AuditLog.create({
      userId: user._id,
      action: "register",
      ip: ip,
      userAgent: req.headers["user-agent"],
      metadata: {
        email: user.email,
        role: user.role,
        attempts: attempts
      }
    });

    res.status(201).json({
      success: true,
      message: "Registration successful! Please check your email to verify your account.",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        embeddingsGenerated: user.embeddingsGenerated
      }
    });

  } catch (error) {
    console.error("Registration error:", error);

    if (error.message === 'RATE_LIMITED') {
      return res.status(429).json({
        success: false,
        message: "Too many registration attempts. Please try again later.",
        code: "RATE_LIMITED"
      });
    }

    res.status(500).json({
      success: false,
      message: "Registration failed",
      code: "REGISTRATION_ERROR",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Verify Email Controller
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user with matching token
    const user = await User.findOne({
      email: decoded.email,
      verificationToken: token
    });

    if (!user) {
      return res.status(400).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Invalid Verification Link</title>
          <style>
            body { font-family: Arial, sans-serif; background: #f9fafb; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 100px auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center; }
            h2 { color: #dc2626; margin-bottom: 20px; }
            p { color: #4b5563; margin-bottom: 30px; line-height: 1.6; }
            .btn { display: inline-block; background: #2563eb; color: white; padding: 12px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; transition: background 0.3s; }
            .btn:hover { background: #1d4ed8; }
            .error { color: #dc2626; font-size: 48px; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="error">❌</div>
            <h2>Invalid or Expired Verification Link</h2>
            <p>The verification link is invalid or has expired. Please request a new verification email.</p>
            <a href="${process.env.FRONTEND_URL}/resend-verification" class="btn">Request New Verification Email</a>
          </div>
        </body>
        </html>
      `);
    }

    // Check if already verified
    if (user.verified) {
      return res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Already Verified</title>
          <style>
            body { font-family: Arial, sans-serif; background: #f9fafb; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 100px auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center; }
            h2 { color: #059669; margin-bottom: 20px; }
            p { color: #4b5563; margin-bottom: 30px; line-height: 1.6; }
            .btn { display: inline-block; background: #2563eb; color: white; padding: 12px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; transition: background 0.3s; }
            .btn:hover { background: #1d4ed8; }
            .success { color: #059669; font-size: 48px; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="success">✅</div>
            <h2>Email Already Verified</h2>
            <p>Your email has already been verified. You can now log in to your account.</p>
            <a href="${process.env.FRONTEND_URL}/login" class="btn">Go to Login</a>
          </div>
        </body>
        </html>
      `);
    }

    // Mark as verified
    user.verified = true;
    user.verificationToken = null;
    user.verifiedAt = new Date();
    await user.save();

    // Log to audit log
    await AuditLog.create({
      userId: user._id,
      action: "email_verified",
      ip: getClientIP(req),
      userAgent: req.headers["user-agent"]
    });

    // Send welcome email
    await sendSecurityAlertEmail(user, null, null, "welcome");

    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verified</title>
        <style>
          body { font-family: Arial, sans-serif; background: #f9fafb; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 100px auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center; }
          h2 { color: #059669; margin-bottom: 20px; }
          p { color: #4b5563; margin-bottom: 30px; line-height: 1.6; }
          .btn { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; transition: background 0.3s; }
          .btn:hover { background: #1d4ed8; }
          .celebrate { color: #2563eb; font-size: 48px; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="celebrate">🎉</div>
          <h2>Email Verified Successfully!</h2>
          <p>Your email has been verified successfully. You can now access all features of Phluxo.</p>
          <a href="${process.env.FRONTEND_URL}/login" class="btn">Continue to Login</a>
        </div>
      </body>
      </html>
    `);

  } catch (error) {
    console.error("Email verification error:", error);

    await AuditLog.create({
      action: "email_verification_failed",
      ip: getClientIP(req),
      userAgent: req.headers["user-agent"],
      metadata: { error: error.message }
    });

    res.status(400).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verification Failed</title>
        <style>
          body { font-family: Arial, sans-serif; background: #f9fafb; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 100px auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center; }
          h2 { color: #dc2626; margin-bottom: 20px; }
          p { color: #4b5563; margin-bottom: 30px; line-height: 1.6; }
          .btn { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; transition: background 0.3s; }
          .btn:hover { background: #1d4ed8; }
          .error { color: #dc2626; font-size: 48px; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="error">❌</div>
          <h2>Verification Failed</h2>
          <p>The verification link is invalid or has expired.</p>
          <a href="${process.env.FRONTEND_URL}/resend-verification" class="btn">Request a New Verification Email</a>
        </div>
      </body>
      </html>
    `);
  }
};

// Resend Verification Email Controller
export const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
        code: "EMAIL_REQUIRED"
      });
    }

    // Rate limiting
    const attempts = await checkRateLimit(`resend:${email}`, 3, 3600000); // 3 per hour

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        code: "USER_NOT_FOUND"
      });
    }

    if (user.verified) {
      return res.status(400).json({
        success: false,
        message: "User already verified",
        code: "ALREADY_VERIFIED"
      });
    }

    // Check if recently sent
    if (user.verificationSentAt &&
      Date.now() - user.verificationSentAt < 60000) { // 1 minute
      return res.status(429).json({
        success: false,
        message: "Please wait before requesting another verification email",
        code: "RESEND_TOO_SOON"
      });
    }

    // Generate new verification token
    const verificationToken = generateToken({ email }, "24h");
    user.verificationToken = verificationToken;
    user.verificationSentAt = new Date();
    await user.save();

    // Send verification email
    await sendVerificationEmail(user, verificationToken);

    // Log to audit log
    await AuditLog.create({
      userId: user._id,
      action: "verification_resent",
      ip: getClientIP(req),
      userAgent: req.headers["user-agent"],
      metadata: { attempts: attempts }
    });

    res.json({
      success: true,
      message: "Verification email sent successfully. Please check your inbox.",
      data: {
        id: user._id,
        email: user.email,
        resendAt: new Date()
      }
    });

  } catch (error) {
    console.error("Resend verification error:", error);

    if (error.message === 'RATE_LIMITED') {
      return res.status(429).json({
        success: false,
        message: "Too many resend attempts. Please try again later.",
        code: "RATE_LIMITED"
      });
    }

    if (error.message.includes("Failed to send verification email")) {
      return res.status(500).json({
        success: false,
        message: "Failed to send verification email. Please try again later.",
        code: "EMAIL_SEND_FAILED"
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to resend verification email",
      code: "RESEND_FAILED"
    });
  }
};

// Login Controller
export const loginUser = async (req, res) => {
  try {
    // Input validation
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
        code: "VALIDATION_ERROR"
      });
    }

    const { email, password } = value;
    const ip = getClientIP(req);

    // Rate limiting by IP and email
    const ipAttempts = await checkRateLimit(`login:ip:${ip}`, 10, 900000); // 10 per 15 minutes
    const emailAttempts = await checkRateLimit(`login:email:${email}`, 5, 900000); // 5 per 15 minutes

    // Check if token is blacklisted
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const blacklisted = await TokenBlacklist.findOne({ token });
      if (blacklisted) {
        return res.status(401).json({
          success: false,
          message: "Token invalidated",
          code: "TOKEN_INVALIDATED"
        });
      }
    }

    // Secure password comparison with timing attack protection
    const authResult = await securePasswordComparison(email, password);

    if (!authResult.success) {
      // Record failed login attempt
      if (authResult.user) {
        await authResult.user.recordFailedLogin({
          ip: ip,
          userAgent: req.headers["user-agent"]
        });

        // Check if account is locked
        if (authResult.user.isAccountLocked()) {
          return res.status(423).json({
            success: false,
            message: "Account locked. Please try again later or reset your password.",
            code: "ACCOUNT_LOCKED",
            lockUntil: authResult.user.lockUntil
          });
        }
      }

      // Log failed attempt
      await AuditLog.create({
        userId: authResult.user?._id,
        action: "login_failed",
        ip: ip,
        userAgent: req.headers["user-agent"],
        metadata: {
          email: email,
          ipAttempts: ipAttempts,
          emailAttempts: emailAttempts
        }
      });

      return res.status(401).json({
        success: false,
        message: authResult.message,
        code: authResult.code
      });
    }

    const user = authResult.user;

    // Check if email is verified
    if (!user.verified) {
      return res.status(401).json({
        success: false,
        message: "Please verify your email address",
        code: "EMAIL_NOT_VERIFIED",
        resendLink: `${process.env.FRONTEND_URL}/resend-verification`
      });
    }

    // Check if account is active
    if (!user.active) {
      return res.status(401).json({
        success: false,
        message: "Account is deactivated. Please contact support.",
        code: "ACCOUNT_DEACTIVATED"
      });
    }

    // Generate device fingerprint
    const deviceFingerprint = generateDeviceFingerprint(req);
    const location = await getLocationFromIP(ip);

    // Check for suspicious login
    const suspicious = user.isSuspiciousLogin({
      deviceId: deviceFingerprint,
      location: { country: location?.country || 'Unknown' }
    });

    // Reset login attempts on successful login
    user.loginAttempts = 0;
    user.lockUntil = null;

    // Smart 2FA triggering
    if (suspicious && user.twoFactorAuth?.enabled) {
      const tempToken = generateToken(
        {
          id: user._id,
          twoFAPending: true,
          deviceId: deviceFingerprint
        },
        "5m"
      );

      // Send security alert
      await sendSecurityAlertEmail(user, location?.country, req.headers["user-agent"], "new_login");

      return res.status(200).json({
        success: true,
        message: "Additional verification required",
        code: "2FA_REQUIRED",
        require2FA: true,
        tempToken,
        twoFAMethod: "totp"
      });
    }

    // Record successful login
    await user.recordLogin({
      ip,
      userAgent: req.headers["user-agent"],
      method: "password",
      location: location?.country || 'Unknown',
      deviceId: deviceFingerprint
    });

    // Generate embeddings if needed
    await user.generateAllEmbeddings();

    // Generate tokens
    const accessToken = generateToken({ id: user._id }, "15m");
    const refreshToken = generateRefreshToken();

    // Store refresh token
    await RefreshToken.create({
      userId: user._id,
      token: refreshToken,
      deviceId: deviceFingerprint,
      ip,
      userAgent: req.headers["user-agent"],
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    });

    // Create session
    const sessionId = crypto.randomBytes(32).toString('hex');
    await Session.create({
      userId: user._id,
      sessionId,
      deviceId: deviceFingerprint,
      ip,
      userAgent: req.headers["user-agent"],
      location: location?.country || 'Unknown',
      lastActive: new Date(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    });

    // Set secure cookies
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/api/auth/refresh'
    });

    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // Clear rate limits on successful login
    await redisClient.del(`login:ip:${ip}`);
    await redisClient.del(`login:email:${email}`);

    // Log successful login
    await AuditLog.create({
      userId: user._id,
      action: "login_success",
      ip: ip,
      userAgent: req.headers["user-agent"],
      metadata: {
        method: "password",
        deviceId: deviceFingerprint,
        location: location?.country
      }
    });

    // Set authorization header
    res.set("Authorization", `Bearer ${accessToken}`);

    return res.json({
      success: true,
      message: "Login successful",
      data: {
        accessToken,
        refreshToken,
        sessionId,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          twoFactorEnabled: user.twoFactorAuth?.enabled || false,
          avatar: user.avatar,
          preferences: user.preferences
        }
      }
    });

  } catch (error) {
    console.error("Login error:", error);

    if (error.message === 'RATE_LIMITED') {
      return res.status(429).json({
        success: false,
        message: "Too many login attempts. Please try again later.",
        code: "RATE_LIMITED"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Login failed",
      code: "LOGIN_FAILED",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Verify 2FA during login
export const verify2FALogin = async (req, res) => {
  try {
    // Input validation
    const { error, value } = verify2FASchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
        code: "VALIDATION_ERROR"
      });
    }

    const { email, token } = value;

    // Rate limiting
    const attempts = await checkRateLimit(`2fa:${email}`, 5, 300000); // 5 per 5 minutes

    const user = await User.findOne({ email });
    if (!user || !user.twoFactorAuth?.enabled) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
        code: "INVALID_REQUEST"
      });
    }

    // Check for backup code
    const isBackupCode = user.twoFactorAuth.backupCodes.some(
      backup => backup.code === token && !backup.used
    );

    let verified = false;

    if (isBackupCode) {
      // Mark backup code as used
      user.twoFactorAuth.backupCodes = user.twoFactorAuth.backupCodes.map(backup =>
        backup.code === token ? { ...backup, used: true, usedAt: new Date() } : backup
      );
      await user.save();
      verified = true;
    } else {
      // Verify TOTP token
      verified = speakeasy.totp.verify({
        secret: user.twoFactorAuth.secret,
        encoding: 'base32',
        token: token,
        window: 2 // Allow 2 time steps for clock skew
      });
    }

    if (!verified) {
      await AuditLog.create({
        userId: user._id,
        action: "2fa_failed",
        ip: getClientIP(req),
        userAgent: req.headers["user-agent"],
        metadata: { attempts: attempts }
      });

      return res.status(400).json({
        success: false,
        message: "Invalid verification code",
        code: "INVALID_2FA_CODE"
      });
    }

    // Generate device fingerprint
    const deviceFingerprint = generateDeviceFingerprint(req);
    const ip = getClientIP(req);
    const location = await getLocationFromIP(ip);

    // Record 2FA login
    await user.recordLogin({
      ip,
      userAgent: req.headers["user-agent"],
      method: "2fa",
      location: location?.country || 'Unknown',
      deviceId: deviceFingerprint
    });

    // Generate tokens
    const accessToken = generateToken({ id: user._id }, "15m");
    const refreshToken = generateRefreshToken();

    // Store refresh token
    await RefreshToken.create({
      userId: user._id,
      token: refreshToken,
      deviceId: deviceFingerprint,
      ip,
      userAgent: req.headers["user-agent"],
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    // Create session
    const sessionId = crypto.randomBytes(32).toString('hex');
    await Session.create({
      userId: user._id,
      sessionId,
      deviceId: deviceFingerprint,
      ip,
      userAgent: req.headers["user-agent"],
      location: location?.country || 'Unknown',
      lastActive: new Date(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    // Set secure cookies
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/api/auth/refresh'
    });

    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // Clear 2FA rate limits
    await redisClient.del(`2fa:${email}`);

    // Log successful 2FA
    await AuditLog.create({
      userId: user._id,
      action: "2fa_success",
      ip: ip,
      userAgent: req.headers["user-agent"],
      metadata: {
        method: isBackupCode ? "backup_code" : "totp",
        deviceId: deviceFingerprint
      }
    });

    // Set authorization header
    res.set("Authorization", `Bearer ${accessToken}`);

    res.json({
      success: true,
      message: "2FA verification successful",
      data: {
        accessToken,
        refreshToken,
        sessionId,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar
        }
      }
    });

  } catch (error) {
    console.error("2FA verification error:", error);

    if (error.message === 'RATE_LIMITED') {
      return res.status(429).json({
        success: false,
        message: "Too many 2FA attempts. Please try again later.",
        code: "RATE_LIMITED"
      });
    }

    res.status(500).json({
      success: false,
      message: "2FA verification failed",
      code: "2FA_VERIFICATION_FAILED",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Refresh Token Controller
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token required",
        code: "REFRESH_TOKEN_REQUIRED"
      });
    }

    // Find valid refresh token
    const storedToken = await RefreshToken.findOne({
      token: refreshToken,
      expiresAt: { $gt: new Date() },
      revoked: false
    });

    if (!storedToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
        code: "INVALID_REFRESH_TOKEN"
      });
    }

    // Get user
    const user = await User.findById(storedToken.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        code: "USER_NOT_FOUND"
      });
    }

    // Check if user is active
    if (!user.active) {
      return res.status(401).json({
        success: false,
        message: "Account is deactivated",
        code: "ACCOUNT_DEACTIVATED"
      });
    }

    // Revoke old refresh token
    storedToken.revoked = true;
    storedToken.revokedAt = new Date();
    await storedToken.save();

    // Generate new tokens
    const newAccessToken = generateToken({ id: user._id }, "15m");
    const newRefreshToken = generateRefreshToken();

    // Store new refresh token
    await RefreshToken.create({
      userId: user._id,
      token: newRefreshToken,
      deviceId: storedToken.deviceId,
      ip: getClientIP(req),
      userAgent: req.headers["user-agent"],
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    // Update session
    await Session.findOneAndUpdate(
      { userId: user._id, deviceId: storedToken.deviceId },
      { lastActive: new Date() }
    );

    // Set new refresh token cookie
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/api/auth/refresh'
    });

    // Log token refresh
    await AuditLog.create({
      userId: user._id,
      action: "token_refreshed",
      ip: getClientIP(req),
      userAgent: req.headers["user-agent"]
    });

    // Set authorization header
    res.set("Authorization", `Bearer ${newAccessToken}`);

    res.json({
      success: true,
      message: "Token refreshed",
      data: {
        accessToken: newAccessToken
      }
    });

  } catch (error) {
    console.error("Token refresh error:", error);
    res.status(500).json({
      success: false,
      message: "Token refresh failed",
      code: "TOKEN_REFRESH_FAILED"
    });
  }
};

// Logout Controller
export const logoutUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const sessionId = req.cookies.sessionId;
    const refreshToken = req.cookies.refreshToken;

    // Blacklist JWT token
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.decode(token);

      await TokenBlacklist.create({
        token,
        userId: decoded?.id,
        expiresAt: new Date(decoded?.exp * 1000 || Date.now() + 3600000)
      });
    }

    // Revoke refresh token
    if (refreshToken) {
      await RefreshToken.findOneAndUpdate(
        { token: refreshToken },
        { revoked: true, revokedAt: new Date() }
      );
    }

    // Clear session
    if (sessionId) {
      await Session.findOneAndDelete({ sessionId });
    }

    // Clear cookies
    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');

    // Log logout
    if (req.user) {
      await AuditLog.create({
        userId: req.user._id,
        action: "logout",
        ip: getClientIP(req),
        userAgent: req.headers["user-agent"]
      });
    }

    res.json({
      success: true,
      message: "Logged out successfully"
    });

  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Logout failed",
      code: "LOGOUT_FAILED"
    });
  }
};

// Get Current User Profile
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password -verificationToken -twoFactorAuth.secret -resetPasswordToken")
      .populate('sessions', 'deviceId location ip userAgent lastActive')
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        code: "USER_NOT_FOUND"
      });
    }

    // Mask sensitive data
    if (user.twoFactorAuth?.backupCodes) {
      user.twoFactorAuth.backupCodes = user.twoFactorAuth.backupCodes.map(() => '••••••');
    }

    // Add computed fields
    user.isOnline = user.lastActive && (Date.now() - user.lastActive) < 15 * 60 * 1000;
    user.accountAge = Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24));

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
      code: "PROFILE_FETCH_FAILED"
    });
  }
};

// Request Password Reset
export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
        code: "EMAIL_REQUIRED"
      });
    }

    // Rate limiting
    const ip = getClientIP(req);
    const ipAttempts = await checkRateLimit(`reset:ip:${ip}`, 5, 3600000); // 5 per hour
    const emailAttempts = await checkRateLimit(`reset:email:${email}`, 3, 3600000); // 3 per hour

    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal user existence - return success anyway
      return res.status(200).json({
        success: true,
        message: "If an account exists with this email, you will receive a password reset link."
      });
    }

    // Check if user is verified
    if (!user.verified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email before resetting password",
        code: "EMAIL_NOT_VERIFIED"
      });
    }

    // Check if already requested recently (last 10 minutes)
    if (user.resetPasswordExpires && user.resetPasswordExpires > new Date()) {
      return res.status(429).json({
        success: false,
        message: "Reset email already sent. Please check your inbox or wait before requesting another.",
        code: "RESET_ALREADY_SENT",
        retryAfter: Math.ceil((user.resetPasswordExpires - new Date()) / 1000)
      });
    }

    // Create reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // Send reset email
    await sendPasswordResetEmail(user, resetToken);

    // Log reset request
    await AuditLog.create({
      userId: user._id,
      action: "password_reset_requested",
      ip: ip,
      userAgent: req.headers["user-agent"],
      metadata: {
        ipAttempts: ipAttempts,
        emailAttempts: emailAttempts
      }
    });

    res.json({
      success: true,
      message: "Password reset email sent. Please check your inbox."
    });

  } catch (error) {
    console.error("Password reset request error:", error);

    if (error.message === 'RATE_LIMITED') {
      return res.status(429).json({
        success: false,
        message: "Too many reset requests. Please try again later.",
        code: "RATE_LIMITED"
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to process password reset request",
      code: "RESET_REQUEST_FAILED"
    });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;

    // Validate password
    const { error, value } = resetPasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
        code: "VALIDATION_ERROR"
      });
    }

    const { password } = value;
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
        code: "INVALID_RESET_TOKEN"
      });
    }

    // Check if password was used before
    const passwordUsed = await user.isPasswordUsedBefore(password);
    if (passwordUsed) {
      return res.status(400).json({
        success: false,
        message: "Password was used before. Please choose a different one.",
        code: "PASSWORD_REUSED"
      });
    }

    // Update password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.passwordChangedAt = new Date();

    await user.save();

    // Revoke all sessions and refresh tokens
    await Session.deleteMany({ userId: user._id });
    await RefreshToken.updateMany(
      { userId: user._id },
      { revoked: true, revokedAt: new Date() }
    );

    // Clear rate limits for this user
    await redisClient.del(`login:email:${user.email}`);

    // Send security alert
    await sendSecurityAlertEmail(user, null, null, "password_changed");

    // Log password reset
    await AuditLog.create({
      userId: user._id,
      action: "password_reset_completed",
      ip: getClientIP(req),
      userAgent: req.headers["user-agent"]
    });

    res.json({
      success: true,
      message: "Password reset successful. Please login with your new password."
    });

  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to reset password",
      code: "RESET_FAILED"
    });
  }
};

// Change Password
export const changePassword = async (req, res) => {
  try {
    // Validate input
    const { error, value } = changePasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
        code: "VALIDATION_ERROR"
      });
    }

    const { currentPassword, newPassword } = value;

    // Get user with password
    const user = await User.findById(req.user.id).select("+password");

    // Verify current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      // Record failed attempt
      await user.recordFailedLogin({
        ip: getClientIP(req),
        userAgent: req.headers["user-agent"]
      });

      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
        code: "INCORRECT_PASSWORD"
      });
    }

    // Check if new password is same as current
    if (currentPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from current password",
        code: "SAME_PASSWORD"
      });
    }

    // Check if password was used before
    const passwordUsed = await user.isPasswordUsedBefore(newPassword);
    if (passwordUsed) {
      return res.status(400).json({
        success: false,
        message: "Password was used before. Please choose a different one.",
        code: "PASSWORD_REUSED"
      });
    }

    // Update password
    user.password = newPassword;
    user.passwordChangedAt = new Date();
    await user.save();

    // Revoke all sessions except current
    const currentSessionId = req.cookies.sessionId;
    await Session.deleteMany({
      userId: user._id,
      sessionId: { $ne: currentSessionId }
    });

    // Revoke all refresh tokens except current device
    const currentDeviceId = generateDeviceFingerprint(req);
    await RefreshToken.updateMany(
      {
        userId: user._id,
        deviceId: { $ne: currentDeviceId }
      },
      {
        revoked: true,
        revokedAt: new Date()
      }
    );

    // Send security alert
    await sendSecurityAlertEmail(user, null, null, "password_changed");

    // Log password change
    await AuditLog.create({
      userId: user._id,
      action: "password_changed",
      ip: getClientIP(req),
      userAgent: req.headers["user-agent"]
    });

    res.json({
      success: true,
      message: "Password changed successfully"
    });

  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to change password",
      code: "PASSWORD_CHANGE_FAILED"
    });
  }
};

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    // Validate input
    const { error, value } = updateProfileSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
        code: "VALIDATION_ERROR"
      });
    }

    // Remove protected fields
    delete value.password;
    delete value.email;
    delete value.role;
    delete value.verified;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: value },
      { new: true, runValidators: true }
    ).select("-password -twoFactorAuth.secret -verificationToken -resetPasswordToken");

    // Regenerate embeddings if name/bio changed
    if (value.name || value.bio) {
      await user.generateAllEmbeddings();
    }

    // Log profile update
    await AuditLog.create({
      userId: user._id,
      action: "profile_updated",
      ip: getClientIP(req),
      userAgent: req.headers["user-agent"],
      metadata: { fields: Object.keys(value) }
    });

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: user
    });

  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
      code: "PROFILE_UPDATE_FAILED"
    });
  }
};

// Enable 2FA
export const enable2FA = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.twoFactorAuth?.enabled) {
      return res.status(400).json({
        success: false,
        message: "2FA is already enabled",
        code: "2FA_ALREADY_ENABLED"
      });
    }

    // Generate secret
    const secret = speakeasy.generateSecret({
      name: `Phluxo:${user.email}`,
      length: 20
    });

    user.twoFactorAuth = {
      enabled: false, // Not enabled until verified
      secret: secret.base32,
      backupCodes: [],
      method: "app"
    };

    await user.save({ validateBeforeSave: false });

    // Generate backup codes
    const backupCodes = await user.generate2FABackupCodes();

    // Log 2FA setup start
    await AuditLog.create({
      userId: user._id,
      action: "2fa_setup_started",
      ip: getClientIP(req),
      userAgent: req.headers["user-agent"]
    });

    res.json({
      success: true,
      message: "2FA setup initiated",
      data: {
        secret: secret.base32,
        qrCodeUrl: secret.otpauth_url,
        backupCodes // Show only once - warn user to save them
      }
    });

  } catch (error) {
    console.error("Enable 2FA error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to enable 2FA",
      code: "2FA_ENABLE_FAILED"
    });
  }
};

// Verify 2FA Setup
export const verify2FASetup = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token || token.length !== 6) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code",
        code: "INVALID_2FA_CODE"
      });
    }

    const user = await User.findById(req.user.id);

    if (!user.twoFactorAuth?.secret) {
      return res.status(400).json({
        success: false,
        message: "2FA not set up",
        code: "2FA_NOT_SETUP"
      });
    }

    // Rate limiting
    const attempts = await checkRateLimit(`2fa_setup:${user.email}`, 5, 300000);

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorAuth.secret,
      encoding: 'base32',
      token,
      window: 2
    });

    if (!verified) {
      await AuditLog.create({
        userId: user._id,
        action: "2fa_setup_failed",
        ip: getClientIP(req),
        userAgent: req.headers["user-agent"],
        metadata: { attempts: attempts }
      });

      return res.status(400).json({
        success: false,
        message: "Invalid verification code",
        code: "INVALID_2FA_CODE"
      });
    }

    // Enable 2FA
    user.twoFactorAuth.enabled = true;
    user.twoFactorAuth.lastUsed = new Date();
    await user.save({ validateBeforeSave: false });

    // Clear rate limit
    await redisClient.del(`2fa_setup:${user.email}`);

    // Log successful 2FA setup
    await AuditLog.create({
      userId: user._id,
      action: "2fa_enabled",
      ip: getClientIP(req),
      userAgent: req.headers["user-agent"]
    });

    // Send security alert
    await sendSecurityAlertEmail(user, null, null, "2fa_enabled");

    res.json({
      success: true,
      message: "2FA enabled successfully"
    });

  } catch (error) {
    console.error("Verify 2FA setup error:", error);

    if (error.message === 'RATE_LIMITED') {
      return res.status(429).json({
        success: false,
        message: "Too many verification attempts. Please try again later.",
        code: "RATE_LIMITED"
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to verify 2FA setup",
      code: "2FA_VERIFY_FAILED"
    });
  }
};

// Disable 2FA
export const disable2FA = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
        code: "PASSWORD_REQUIRED"
      });
    }

    const user = await User.findById(req.user.id).select("+password");

    // Verify password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      // Record failed attempt
      await user.recordFailedLogin({
        ip: getClientIP(req),
        userAgent: req.headers["user-agent"]
      });

      return res.status(400).json({
        success: false,
        message: "Incorrect password",
        code: "INCORRECT_PASSWORD"
      });
    }

    if (!user.twoFactorAuth?.enabled) {
      return res.status(400).json({
        success: false,
        message: "2FA is not enabled",
        code: "2FA_NOT_ENABLED"
      });
    }

    // Disable 2FA
    user.twoFactorAuth = undefined;
    await user.save({ validateBeforeSave: false });

    // Log 2FA disable
    await AuditLog.create({
      userId: user._id,
      action: "2fa_disabled",
      ip: getClientIP(req),
      userAgent: req.headers["user-agent"]
    });

    // Send security alert
    await sendSecurityAlertEmail(user, null, null, "2fa_disabled");

    res.json({
      success: true,
      message: "2FA disabled successfully"
    });

  } catch (error) {
    console.error("Disable 2FA error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to disable 2FA",
      code: "2FA_DISABLE_FAILED"
    });
  }
};

// Get trusted devices
export const getTrustedDevices = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("trustedDevices");

    res.json({
      success: true,
      data: user.trustedDevices || []
    });
  } catch (error) {
    console.error("Get trusted devices error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch trusted devices",
      code: "DEVICES_FETCH_FAILED"
    });
  }
};

// Remove trusted device
export const removeTrustedDevice = async (req, res) => {
  try {
    const { deviceId } = req.params;

    const user = await User.findById(req.user.id);

    // Check if device exists
    const deviceExists = user.trustedDevices?.some(device => device.deviceId === deviceId);
    if (!deviceExists) {
      return res.status(404).json({
        success: false,
        message: "Device not found",
        code: "DEVICE_NOT_FOUND"
      });
    }

    await user.removeTrustedDevice(deviceId);

    // Also remove sessions for this device
    await Session.deleteMany({
      userId: req.user.id,
      deviceId
    });

    // Revoke refresh tokens for this device
    await RefreshToken.updateMany(
      {
        userId: req.user.id,
        deviceId
      },
      {
        revoked: true,
        revokedAt: new Date()
      }
    );

    // Log device removal
    await AuditLog.create({
      userId: user._id,
      action: "device_removed",
      ip: getClientIP(req),
      userAgent: req.headers["user-agent"],
      metadata: { deviceId }
    });

    res.json({
      success: true,
      message: "Device removed successfully"
    });

  } catch (error) {
    console.error("Remove device error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to remove device",
      code: "DEVICE_REMOVE_FAILED"
    });
  }
};

// Get security logs
export const getSecurityLogs = async (req, res) => {
  try {
    const { limit = 50, offset = 0, action } = req.query;

    const query = { userId: req.user.id };
    if (action) {
      query.action = action;
    }

    const logs = await AuditLog.find(query)
      .select('-__v')
      .sort('-timestamp')
      .skip(parseInt(offset))
      .limit(parseInt(limit));

    const total = await AuditLog.countDocuments(query);

    res.json({
      success: true,
      data: {
        logs,
        pagination: {
          total,
          limit: parseInt(limit),
          offset: parseInt(offset),
          hasMore: total > parseInt(offset) + parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error("Get security logs error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch security logs",
      code: "LOGS_FETCH_FAILED"
    });
  }
};

// Deactivate account
export const deactivateAccount = async (req, res) => {
  try {
    const { password, reason } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
        code: "PASSWORD_REQUIRED"
      });
    }

    const user = await User.findById(req.user.id).select("+password");

    // Verify password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      // Record failed attempt
      await user.recordFailedLogin({
        ip: getClientIP(req),
        userAgent: req.headers["user-agent"]
      });

      return res.status(400).json({
        success: false,
        message: "Incorrect password",
        code: "INCORRECT_PASSWORD"
      });
    }

    // Deactivate account
    user.active = false;
    user.deactivatedAt = new Date();
    user.deactivationReason = reason;

    await user.save({ validateBeforeSave: false });

    // Revoke all sessions and refresh tokens
    await Session.deleteMany({ userId: user._id });
    await RefreshToken.updateMany(
      { userId: user._id },
      { revoked: true, revokedAt: new Date() }
    );

    // Blacklist current token
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.decode(token);

      await TokenBlacklist.create({
        token,
        userId: user._id,
        expiresAt: new Date(decoded?.exp * 1000 || Date.now() + 3600000)
      });
    }

    // Clear cookies
    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');

    // Log account deactivation
    await AuditLog.create({
      userId: user._id,
      action: "account_deactivated",
      ip: getClientIP(req),
      userAgent: req.headers["user-agent"],
      metadata: { reason }
    });

    // Send security alert
    await sendSecurityAlertEmail(user, null, null, "account_deactivated");

    res.json({
      success: true,
      message: "Account deactivated successfully"
    });

  } catch (error) {
    console.error("Deactivate account error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to deactivate account",
      code: "DEACTIVATION_FAILED"
    });
  }
};

// Get active sessions
export const getActiveSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user.id })
      .select('-__v')
      .sort('-lastActive');

    // Mark current session
    const currentSessionId = req.cookies.sessionId;
    const sessionsWithCurrent = sessions.map(session => ({
      ...session.toObject(),
      isCurrent: session.sessionId === currentSessionId
    }));

    res.json({
      success: true,
      data: sessionsWithCurrent
    });
  } catch (error) {
    console.error("Get sessions error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch sessions",
      code: "SESSIONS_FETCH_FAILED"
    });
  }
};

// Revoke specific session
export const revokeSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await Session.findOneAndDelete({
      _id: sessionId,
      userId: req.user.id
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
        code: "SESSION_NOT_FOUND"
      });
    }

    // Also revoke associated refresh token
    await RefreshToken.findOneAndUpdate(
      { deviceId: session.deviceId, userId: req.user.id },
      { revoked: true, revokedAt: new Date() }
    );

    // Log session revocation
    await AuditLog.create({
      userId: req.user.id,
      action: "session_revoked",
      ip: getClientIP(req),
      userAgent: req.headers["user-agent"],
      metadata: { sessionId: session._id, deviceId: session.deviceId }
    });

    res.json({
      success: true,
      message: "Session revoked successfully"
    });
  } catch (error) {
    console.error("Revoke session error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to revoke session",
      code: "SESSION_REVOKE_FAILED"
    });
  }
};

// Revoke all sessions except current
export const revokeAllSessions = async (req, res) => {
  try {
    const currentSessionId = req.cookies.sessionId;
    const currentDeviceId = generateDeviceFingerprint(req);

    // Delete all sessions except current
    const deletedSessions = await Session.deleteMany({
      userId: req.user.id,
      sessionId: { $ne: currentSessionId }
    });

    // Revoke all refresh tokens except current device
    await RefreshToken.updateMany(
      {
        userId: req.user.id,
        deviceId: { $ne: currentDeviceId }
      },
      {
        revoked: true,
        revokedAt: new Date()
      }
    );

    // Log all sessions revoked
    await AuditLog.create({
      userId: req.user.id,
      action: "all_sessions_revoked",
      ip: getClientIP(req),
      userAgent: req.headers["user-agent"],
      metadata: {
        sessionsRevoked: deletedSessions.deletedCount,
        currentSessionId
      }
    });

    res.json({
      success: true,
      message: "All other sessions revoked successfully",
      data: {
        sessionsRevoked: deletedSessions.deletedCount
      }
    });
  } catch (error) {
    console.error("Revoke all sessions error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to revoke sessions",
      code: "SESSIONS_REVOKE_FAILED"
    });
  }
};

// Verify OTP for login (alternative method)
export const verifyLoginOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.status(400).json({
        success: false,
        message: "User ID and OTP are required",
        code: "VALIDATION_ERROR"
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        code: "USER_NOT_FOUND"
      });
    }

    const valid = await user.verify2FAOTP(otp);

    if (!valid) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired OTP",
        code: "INVALID_OTP"
      });
    }

    // OTP success → record login
    const ip = getClientIP(req);
    const location = await getLocationFromIP(ip);
    const deviceFingerprint = generateDeviceFingerprint(req);

    await user.recordLogin({
      ip,
      userAgent: req.headers["user-agent"],
      location: location?.country || 'Unknown',
      deviceId: deviceFingerprint,
      method: "otp"
    });

    // Generate tokens
    const accessToken = generateToken({ id: user._id }, "15m");
    const refreshToken = generateRefreshToken();

    // Store refresh token
    await RefreshToken.create({
      userId: user._id,
      token: refreshToken,
      deviceId: deviceFingerprint,
      ip,
      userAgent: req.headers["user-agent"],
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    // Create session
    const sessionId = crypto.randomBytes(32).toString('hex');
    await Session.create({
      userId: user._id,
      sessionId,
      deviceId: deviceFingerprint,
      ip,
      userAgent: req.headers["user-agent"],
      location: location?.country || 'Unknown',
      lastActive: new Date(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    // Set secure cookies
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/api/auth/refresh'
    });

    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // Log OTP login
    await AuditLog.create({
      userId: user._id,
      action: "login_success",
      ip: ip,
      userAgent: req.headers["user-agent"],
      metadata: { method: "otp", deviceId: deviceFingerprint }
    });

    // Set authorization header
    res.set("Authorization", `Bearer ${accessToken}`);

    res.json({
      success: true,
      message: "Login successful",
      data: {
        accessToken,
        refreshToken,
        sessionId,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar
        }
      }
    });

  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({
      success: false,
      message: "OTP verification failed",
      code: "OTP_VERIFICATION_FAILED"
    });
  }
};

// Admin: Get all users
export const getAllUsers = async (req, res) => {
  try {
    // Check admin role
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin role required.",
        code: "ACCESS_DENIED"
      });
    }

    const { page = 1, limit = 20, search = "", role, verified, active } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }

    if (role) query.role = role;
    if (verified !== undefined) query.verified = verified === 'true';
    if (active !== undefined) query.active = active === 'true';

    const users = await User.find(query)
      .select("-password -twoFactorAuth.secret -verificationToken -resetPasswordToken")
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort("-createdAt")
      .lean();

    const total = await User.countDocuments(query);

    // Add computed fields
    const usersWithComputed = users.map(user => ({
      ...user,
      isOnline: user.lastActive && (Date.now() - new Date(user.lastActive).getTime()) < 15 * 60 * 1000,
      accountAge: Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24))
    }));

    res.json({
      success: true,
      data: {
        users: usersWithComputed,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      code: "USERS_FETCH_FAILED"
    });
  }
};

// Admin: Update user role
export const updateUserRole = async (req, res) => {
  try {
    // Check admin role
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin role required.",
        code: "ACCESS_DENIED"
      });
    }

    const { userId } = req.params;
    const { role } = req.body;

    if (!["user", "admin", "moderator"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
        code: "INVALID_ROLE"
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        code: "USER_NOT_FOUND"
      });
    }

    // Don't allow changing your own role
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "Cannot change your own role",
        code: "SELF_ROLE_CHANGE"
      });
    }

    const oldRole = user.role;
    user.role = role;
    await user.save({ validateBeforeSave: false });

    // Log role change
    await AuditLog.create({
      userId: user._id,
      action: "role_changed",
      ip: getClientIP(req),
      userAgent: req.headers["user-agent"],
      metadata: {
        changedBy: req.user.id,
        oldRole,
        newRole: role
      }
    });

    // Send security alert to user
    await sendSecurityAlertEmail(user, null, null, "role_changed");

    res.json({
      success: true,
      message: "User role updated successfully",
      data: {
        id: user._id,
        email: user.email,
        oldRole,
        newRole: user.role
      }
    });

  } catch (error) {
    console.error("Update user role error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update user role",
      code: "ROLE_UPDATE_FAILED"
    });
  }
};

// Health check endpoint
export const healthCheck = async (req, res) => {
  try {
    const health = {
      status: 'healthy',
      timestamp: new Date(),
      uptime: process.uptime(),
      checks: {
        database: 'connected',
        redis: 'connected',
        memory: process.memoryUsage(),
        load: process.cpuUsage()
      },
      version: process.env.npm_package_version || '1.0.0'
    };

    res.status(200).json(health);
  } catch (error) {
    console.error("Health check error:", error);
    res.status(500).json({
      status: 'unhealthy',
      timestamp: new Date(),
      error: error.message
    });
  }
};

// Generate backup codes
export const generateBackupCodes = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.twoFactorAuth?.enabled) {
      return res.status(400).json({
        success: false,
        message: "2FA is not enabled",
        code: "2FA_NOT_ENABLED"
      });
    }

    // Generate new backup codes
    const backupCodes = Array.from({ length: 10 }, () =>
      crypto.randomBytes(4).toString('hex').toUpperCase()
    );

    // Hash and store backup codes
    user.twoFactorAuth.backupCodes = backupCodes.map(code => ({
      code: crypto.createHash('sha256').update(code + process.env.OTP_SALT).digest('hex'),
      used: false
    }));
    user.twoFactorAuth.backupCodesGeneratedAt = new Date();

    await user.save({ validateBeforeSave: false });

    // Log backup codes generation
    await AuditLog.create({
      userId: user._id,
      action: "backup_codes_generated",
      ip: getClientIP(req),
      userAgent: req.headers["user-agent"]
    });

    res.json({
      success: true,
      message: "Backup codes generated successfully",
      data: {
        backupCodes,
        warning: "Save these codes securely. They will not be shown again."
      }
    });

  } catch (error) {
    console.error("Generate backup codes error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate backup codes",
      code: "BACKUP_CODES_FAILED"
    });
  }
};

// Get login activity
export const getLoginActivity = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("loginHistory name email");

    const loginHistory = user.loginHistory || [];

    // Format login activity
    const formattedActivity = loginHistory.slice(0, 50).map(login => ({
      id: login._id || crypto.randomBytes(8).toString('hex'),
      timestamp: login.timestamp,
      ip: login.ip || 'Unknown',
      userAgent: login.userAgent || 'Unknown',
      success: login.success !== false,
      method: login.method || 'password',
      location: login.location || null,
      deviceId: login.deviceId || null
    }));

    const summary = {
      totalLogins: loginHistory.length,
      successfulLogins: loginHistory.filter(l => l.success !== false).length,
      failedLogins: loginHistory.filter(l => l.success === false).length,
      lastLogin: loginHistory.length > 0 ? loginHistory[0].timestamp : null
    };

    res.json({
      success: true,
      data: {
        activity: formattedActivity,
        summary
      }
    });

  } catch (error) {
    console.error("Get login activity error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch login activity",
      code: "ACTIVITY_FETCH_FAILED"
    });
  }
};

// Update user preferences
export const updatePreferences = async (req, res) => {
  try {
    const { theme, language, emailNotifications, privacy } = req.body;

    const updateData = {};
    if (theme) updateData["preferences.theme"] = theme;
    if (language) updateData["preferences.language"] = language;
    if (emailNotifications) updateData["preferences.emailNotifications"] = emailNotifications;
    if (privacy) updateData["preferences.privacy"] = privacy;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password -verificationToken -resetPasswordToken");

    // Log preferences update
    await AuditLog.create({
      userId: user._id,
      action: "preferences_updated",
      ip: getClientIP(req),
      userAgent: req.headers["user-agent"],
      metadata: { changes: Object.keys(updateData) }
    });

    res.json({
      success: true,
      message: "Preferences updated successfully",
      data: user.preferences
    });

  } catch (error) {
    console.error("Update preferences error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update preferences",
      code: "PREFERENCES_UPDATE_FAILED"
    });
  }
};

// Admin: Get user by ID
export const getUserById = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin role required.",
        code: "ACCESS_DENIED"
      });
    }

    const user = await User.findById(req.params.id)
      .select("-password -twoFactorAuth.secret -verificationToken -resetPasswordToken");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        code: "USER_NOT_FOUND"
      });
    }

    res.json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error("Get user by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      code: "USER_FETCH_FAILED"
    });
  }
};

// Admin: Update user
export const updateUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin role required.",
        code: "ACCESS_DENIED"
      });
    }

    const { name, role, active, verified } = req.body;
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        code: "USER_NOT_FOUND"
      });
    }

    // Prepare updates
    const updates = {};
    if (name) updates.name = name;
    if (role && ['user', 'admin', 'moderator'].includes(role)) updates.role = role;
    if (typeof active === 'boolean') updates.active = active;
    if (typeof verified === 'boolean') updates.verified = verified;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password -twoFactorAuth.secret -verificationToken -resetPasswordToken");

    // Log user update
    await AuditLog.create({
      userId: updatedUser._id,
      action: "user_updated_by_admin",
      ip: getClientIP(req),
      userAgent: req.headers["user-agent"],
      metadata: {
        updatedBy: req.user.id,
        changes: updates
      }
    });

    res.json({
      success: true,
      message: "User updated successfully",
      data: updatedUser
    });

  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update user",
      code: "USER_UPDATE_FAILED"
    });
  }
};

// Admin: Delete user
export const deleteUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin role required.",
        code: "ACCESS_DENIED"
      });
    }

    const userId = req.params.id;

    // Prevent self-deletion
    if (userId === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete your own account through admin panel",
        code: "SELF_DELETE_DENIED"
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        code: "USER_NOT_FOUND"
      });
    }

    // Check if last admin
    if (user.role === 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin' });
      if (adminCount <= 1) {
        return res.status(400).json({
          success: false,
          message: "Cannot delete the only admin account",
          code: "LAST_ADMIN"
        });
      }
    }

    // Delete user sessions and tokens
    await Session.deleteMany({ userId });
    await RefreshToken.deleteMany({ userId });

    // Delete user
    await User.findByIdAndDelete(userId);

    // Log deletion
    await AuditLog.create({
      userId: req.user.id,
      action: "user_deleted_by_admin",
      ip: getClientIP(req),
      userAgent: req.headers["user-agent"],
      metadata: {
        deletedUserId: userId,
        deletedUserEmail: user.email
      }
    });

    res.json({
      success: true,
      message: "User deleted successfully"
    });

  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      code: "USER_DELETE_FAILED"
    });
  }
};

// Admin: Get user statistics
export const getUserStats = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin role required.",
        code: "ACCESS_DENIED"
      });
    }

    const totalUsers = await User.countDocuments();
    const verifiedUsers = await User.countDocuments({ verified: true });
    const activeUsers = await User.countDocuments({ active: true });
    const adminUsers = await User.countDocuments({ role: 'admin' });

    // Users created in last 24 hours
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const newUsersToday = await User.countDocuments({ createdAt: { $gte: last24Hours } });

    // Users active in last 15 minutes
    const last15Minutes = new Date(Date.now() - 15 * 60 * 1000);
    const onlineUsers = await User.countDocuments({ lastActive: { $gte: last15Minutes } });

    // Users with 2FA enabled
    const users2FA = await User.countDocuments({ "twoFactorAuth.enabled": true });

    // Growth data for last 7 days
    const growthData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const start = new Date(date.setHours(0, 0, 0, 0));
      const end = new Date(date.setHours(23, 59, 59, 999));

      const count = await User.countDocuments({
        createdAt: { $gte: start, $lte: end }
      });

      growthData.push({
        date: start.toISOString().split('T')[0],
        count
      });
    }

    res.json({
      success: true,
      data: {
        overview: {
          totalUsers,
          verifiedUsers,
          activeUsers,
          adminUsers,
          newUsersToday,
          onlineUsers,
          users2FA
        },
        rates: {
          verificationRate: totalUsers > 0 ? ((verifiedUsers / totalUsers) * 100).toFixed(1) : 0,
          activeRate: totalUsers > 0 ? ((activeUsers / totalUsers) * 100).toFixed(1) : 0,
          twoFAAdoption: totalUsers > 0 ? ((users2FA / totalUsers) * 100).toFixed(1) : 0
        },
        growth: growthData
      }
    });

  } catch (error) {
    console.error("Get user stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user statistics",
      code: "STATS_FETCH_FAILED"
    });
  }
};