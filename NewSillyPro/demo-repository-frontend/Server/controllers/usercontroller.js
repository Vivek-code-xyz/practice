import User from "../models/User.js";
import { mailer } from "../config/mailer.js";
import jwt from "jsonwebtoken";
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import crypto from 'crypto';

// Helper function to hash backup codes
const hashBackupCode = (code) => {
  return crypto.createHash('sha256').update(code + process.env.OTP_SALT).digest('hex');
};

// To generate Token :
const generateToken = (payload, expiresIn = "1d") => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

//send verification Link : 
const sendVerificationEmail = async (user, verificationToken) => {
  try {
    const verifyLink = `${process.env.BASE_URL}/api/auth/verify/${verificationToken}`;

    const emailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #2563eb; margin: 0;">Phluxo</h2>
          <p style="color: #6b7280; margin: 5px 0;">Your Personal Productivity Suite</p>
        </div>
        
        <h3 style="color: #1f2937;">Verify Your Updated Email Address</h3>
        
        <p style="color: #4b5563; line-height: 1.6;">
          You recently updated your email address for your Phluxo account. 
          To complete this change and verify your new email address, please click the button below:
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verifyLink}" 
             style="background-color: #2563eb; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; 
                    display: inline-block; font-weight: bold; font-size: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            Verify New Email Address
          </a>
        </div>
        
        <p style="color: #6b7280; font-size: 14px; text-align: center;">
          Or copy and paste this link in your browser:<br>
          <a href="${verifyLink}" style="color: #2563eb; word-break: break-all;">${verifyLink}</a>
        </p>
        
        <div style="margin-top: 30px; padding: 15px; background-color: #f3f4f6; border-radius: 6px;">
          <p style="color: #dc2626; margin: 0; font-size: 14px;">
            <strong>⚠️ Important:</strong> 
            - This verification link will expire in 24 hours.<br>
            - Your account access will be limited until you verify your new email.
          </p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;">
        
        <div style="text-align: center;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            If you didn't request this email change, please contact support immediately.<br>
            This is an automated message, please do not reply to this email.
          </p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"Phluxo Security" <${process.env.GMAIL_USER}>`,
      to: user.email,
      subject: "Verify Your New Email Address - Phluxo",
      html: emailTemplate,
    };

    const result = await mailer.sendMail(mailOptions);
    console.log(`Verification email sent to ${user.email}:`, result.messageId);
    return result;

  } catch (error) {
    console.error(`Failed to send verification email to ${user.email}:`, error);
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
};

//Get User Only admin
export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = {};

    if (req.query.active) {
      query.active = req.query.active === 'true';
    }

    const users = await User.find(query)
      .select("-password -verificationToken")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      count: users.length,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      },
      users
    });
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message
    });
  }
};

//Get Single User
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password -verificationToken");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (req.user.role !== "admin" && req.user.id !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this user"
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error("Get user error:", error);

    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: error.message
    });
  }
};

//update user 
export const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (req.user.role !== "admin" && req.user.id !== userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this user"
      });
    }

    const updateData = {};
    let emailChanged = false;
    let newVerificationToken = null;

    if (name) updateData.name = name;

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email, _id: { $ne: userId } });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: "Email already exists"
        });
      }

      updateData.email = email;
      updateData.verified = false;
      emailChanged = true;

      newVerificationToken = generateToken({ email });
      updateData.verificationToken = newVerificationToken;
    }

    if (req.body.role && req.user.role === "admin") {
      updateData.role = req.body.role;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      {
        new: true,
        runValidators: true
      }
    ).select("-password -verificationToken");

    if (emailChanged && newVerificationToken) {
      try {
        await sendVerificationEmail(updatedUser, newVerificationToken);

        res.status(200).json({
          success: true,
          message: "User updated successfully. Verification email sent to your new email address.",
          user: updatedUser,
          requiresVerification: true
        });

      } catch (emailError) {
        console.error("Email update succeeded but verification email failed:", emailError);

        res.status(200).json({
          success: true,
          message: "User updated but failed to send verification email. Please use resend verification feature.",
          user: updatedUser,
          requiresVerification: true,
          emailSent: false
        });
      }
    } else {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        user: updatedUser,
        requiresVerification: false
      });
    }

  } catch (error) {
    console.error("Update user error:", error);

    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }

    res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error.message
    });
  }
};

//Delete user
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (req.user.role !== "admin" && req.user.id !== userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this user"
      });
    }

    if (req.user.role === "admin" && req.user.id === userId) {
      const adminCount = await User.countDocuments({ role: "admin" });
      if (adminCount <= 1) {
        return res.status(400).json({
          success: false,
          message: "Cannot delete the only admin account"
        });
      }
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: "User account deleted successfully"
    });

  } catch (error) {
    console.error("Delete user error:", error);

    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message
    });
  }
};

//Change Your Password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id).select("+password");

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect"
      });
    }

    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: "Password updated successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error changing password",
      error: error.message
    });
  }
};

//Get current Usert
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -verificationToken");

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching profile",
      error: error.message
    });
  }
};

//User Preference
export const updatePreferences = async (req, res) => {
  try {
    const { theme, language, emailNotifications, twoFactorAuth } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          "preferences.theme": theme,
          "preferences.language": language,
          "preferences.emailNotifications": emailNotifications,
          "preferences.twoFactorAuth": twoFactorAuth
        }
      },
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      message: "Preferences updated",
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating preferences",
      error: error.message
    });
  }
};

//Get user stats
export const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const verifiedUsers = await User.countDocuments({ verified: true });
    const activeUsers = await User.countDocuments({ active: true });
    const today = new Date();
    const newUsersToday = await User.countDocuments({
      createdAt: {
        $gte: new Date(today.setHours(0, 0, 0, 0))
      }
    });

    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const start = new Date(date.setHours(0, 0, 0, 0));
      const end = new Date(date.setHours(23, 59, 59, 999));

      const count = await User.countDocuments({
        createdAt: { $gte: start, $lte: end }
      });

      last7Days.push({
        date: start.toISOString().split('T')[0],
        count
      });
    }

    res.json({
      success: true,
      stats: {
        totalUsers,
        verifiedUsers,
        activeUsers,
        newUsersToday,
        verificationRate: (verifiedUsers / totalUsers * 100).toFixed(1),
        userGrowth: last7Days
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user stats",
      error: error.message
    });
  }
};

//Two Factor toggle
export const toggleTwoFactorAuth = async (req, res) => {
  try {
    const { enable } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (enable) {
      // Generate 2FA secret using speakeasy
      const secret = speakeasy.generateSecret({
        name: `Phluxo (${user.email})`,
        issuer: "Phluxo"
      });

      user.twoFactorAuth = {
        ...user.twoFactorAuth,
        secret: secret.base32,
        enabled: false // Will be enabled after verification
      };
      await user.save();

      res.json({
        success: true,
        message: "2FA secret generated. Please verify with authenticator app.",
        setupSecret: secret.base32,
        otpauthUrl: secret.otpauth_url
      });
    } else {
      // Disable 2FA
      user.twoFactorAuth = {
        enabled: false,
        secret: undefined,
        backupCodes: []
      };
      await user.save();

      res.json({
        success: true,
        message: "Two-factor authentication disabled",
        twoFactorEnabled: false
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating 2FA settings",
      error: error.message
    });
  }
};

//Get login activity
export const getLoginActivity = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("loginHistory name email");

    const loginHistory = user.loginHistory || [];

    const formattedActivity = loginHistory.slice(0, 20).map(login => ({
      id: login._id || Math.random().toString(36).substr(2, 9),
      timestamp: login.timestamp,
      timeAgo: getTimeAgo(login.timestamp),
      ip: login.ip || 'Unknown',
      device: getDeviceInfo(login.userAgent),
      browser: getBrowserInfo(login.userAgent),
      os: getOSInfo(login.userAgent),
      success: login.success !== false,
      method: getMethodDisplay(login.method),
      location: login.location || 'Unknown',
      status: login.success !== false ? 'success' : 'failed'
    }));

    const summary = {
      totalLogins: loginHistory.length,
      successfulLogins: loginHistory.filter(login => login.success !== false).length,
      failedLogins: loginHistory.filter(login => login.success === false).length,
      lastLogin: loginHistory.length > 0 ? loginHistory[0].timestamp : null,
      uniqueDevices: getUniqueDevices(loginHistory),
      loginMethods: getLoginMethods(loginHistory)
    };

    res.json({
      success: true,
      activity: formattedActivity,
      summary: summary,
      user: {
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Get login activity error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching login activity",
      error: error.message
    });
  }
};

const getTimeAgo = (timestamp) => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return `${Math.floor(diffInSeconds / 2592000)} months ago`;
};

const getDeviceInfo = (userAgent) => {
  if (!userAgent) return 'Unknown';
  if (userAgent.includes('Mobile')) return 'Mobile';
  if (userAgent.includes('Tablet')) return 'Tablet';
  if (userAgent.includes('Windows')) return 'Windows PC';
  if (userAgent.includes('Mac')) return 'Mac';
  if (userAgent.includes('Linux')) return 'Linux PC';
  return 'Desktop';
};

const getBrowserInfo = (userAgent) => {
  if (!userAgent) return 'Unknown';
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  if (userAgent.includes('Opera')) return 'Opera';
  return 'Other Browser';
};

const getOSInfo = (userAgent) => {
  if (!userAgent) return 'Unknown';
  if (userAgent.includes('Windows')) return 'Windows';
  if (userAgent.includes('Mac')) return 'macOS';
  if (userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iOS')) return 'iOS';
  return 'Unknown OS';
};

const getMethodDisplay = (method) => {
  const methods = {
    'password': 'Password',
    '2fa': '2FA Code',
    'backup_code': 'Backup Code'
  };
  return methods[method] || 'Password';
};

const getUniqueDevices = (loginHistory) => {
  const devices = loginHistory.map(login => getDeviceInfo(login.userAgent));
  return [...new Set(devices)].length;
};

const getLoginMethods = (loginHistory) => {
  const methods = {};
  loginHistory.forEach(login => {
    const method = login.method || 'password';
    methods[method] = (methods[method] || 0) + 1;
  });
  return methods;
};

//enable2Fa
export const enable2FA = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.twoFactorAuth) {
      user.twoFactorAuth = {
        enabled: false,
        secret: null,
        backupCodes: []
      };
    }

    if (user.twoFactorAuth.enabled) {
      return res.status(400).json({
        success: false,
        message: "2FA is already enabled"
      });
    }

    const secret = speakeasy.generateSecret({
      name: `Phluxo (${user.email})`,
      issuer: "Phluxo"
    });

    const qrCodeBuffer = await QRCode.toBuffer(secret.otpauth_url);

    user.twoFactorAuth.secret = secret.base32;
    await user.save();

    const emailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #2563eb; margin: 0;">Phluxo</h2>
          <p style="color: #6b7280; margin: 5px 0;">Two-Factor Authentication Setup</p>
        </div>
        
        <h3 style="color: #1f2937;">Hello ${user.name},</h3>
        
        <p style="color: #4b5563; line-height: 1.6;">
          You've requested to enable Two-Factor Authentication (2FA) for your Phluxo account. 
          Please download and scan the attached QR code with your authenticator app.
        </p>
        
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <h4 style="color: #374151; margin-top: 0;">Manual Setup (Alternative):</h4>
          <p style="color: #6b7280; margin: 5px 0; font-family: monospace; word-break: break-all;">
            <strong>Secret Key:</strong> ${secret.base32}
          </p>
          <p style="color: #6b7280; margin: 5px 0;">
            <strong>Account:</strong> Phluxo (${user.email})
          </p>
        </div>
        
        <div style="background-color: #fef3cd; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <h4 style="color: #92400e; margin-top: 0;">📱 How to Set Up:</h4>
          <ol style="color: #92400e; padding-left: 20px;">
            <li>Download the attached QR code image</li>
            <li>Install Google Authenticator or Authy on your phone</li>
            <li>Open the app and tap "Scan a QR Code"</li>
            <li>Select "From Gallery" and choose the downloaded QR code</li>
            <li>Or manually enter the secret key shown above</li>
            <li>Return to Phluxo and enter the 6-digit code to verify</li>
          </ol>
        </div>
        
        <div style="text-align: center; margin: 25px 0;">
          <p style="color: #6b7280;">
            <strong>QR Code File:</strong> Phluxo-2fa-qr.png (attached to this email)
          </p>
        </div>
        
        <div style="background-color: #fee2e2; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <p style="color: #dc2626; margin: 0; font-size: 14px;">
            <strong>⚠️ Security Notice:</strong> This QR code and secret key are sensitive. 
            Do not share them with anyone.
          </p>
        </div>
      </div>
    `;

    await mailer.sendMail({
      from: `"Phluxo Security" <${process.env.GMAIL_USER}>`,
      to: user.email,
      subject: "Set Up Two-Factor Authentication - Phluxo",
      html: emailTemplate,
      attachments: [
        {
          filename: 'Phluxo-2fa-qr.png',
          content: qrCodeBuffer,
          contentType: 'image/png'
        }
      ]
    });

    res.json({
      success: true,
      message: "QR code sent to your email as an attachment. Please check your inbox.",
      manualEntry: "You can also manually enter this secret key: " + secret.base32
    });

  } catch (error) {
    console.error("Enable 2FA error:", error);
    res.status(500).json({
      success: false,
      message: "Error enabling 2FA",
      error: error.message
    });
  }
};

//veify & 2fa set
export const verify2FASetup = async (req, res) => {
  try {
    const { token } = req.body;

    const user = await User.findById(req.user.id);

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Verification token is required"
      });
    }

    if (!user.twoFactorAuth) {
      return res.status(400).json({
        success: false,
        message: "2FA not set up. Please enable 2FA first."
      });
    }

    if (!user.twoFactorAuth.secret) {
      return res.status(400).json({
        success: false,
        message: "2FA secret not found. Please enable 2FA again."
      });
    }

    if (user.twoFactorAuth.enabled) {
      return res.status(400).json({
        success: false,
        message: "2FA is already enabled"
      });
    }

    console.log("Verifying 2FA token:", token);
    console.log("Using secret:", user.twoFactorAuth.secret);

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorAuth.secret,
      encoding: 'base32',
      token: token,
      window: 2
    });

    console.log("Token verification result:", verified);

    if (!verified) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code. Please make sure you're using the current code from your authenticator app."
      });
    }

    const backupCodes = Array.from({ length: 8 }, () =>
      Math.random().toString(36).substring(2, 8).toUpperCase()
    );

    // Hash backup codes before storing
    user.twoFactorAuth.enabled = true;
    user.twoFactorAuth.backupCodes = backupCodes.map(code => ({
      code: hashBackupCode(code),
      used: false
    }));
    await user.save();

    const backupCodesEmail = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #2563eb; margin: 0;">Phluxo</h2>
          <p style="color: #6b7280; margin: 5px 0;">Two-Factor Authentication Enabled</p>
        </div>
        
        <h3 style="color: #1f2937;">Hello ${user.name},</h3>
        
        <p style="color: #4b5563; line-height: 1.6;">
          Two-Factor Authentication has been successfully enabled for your Phluxo account.
        </p>
        
        <div style="background-color: #fef3cd; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <h4 style="color: #92400e; margin-top: 0;">🔐 Your Backup Codes:</h4>
          <p style="color: #92400e; margin: 5px 0;">
            Save these backup codes in a secure place. Each code can be used once if you lose access to your authenticator app.
          </p>
          <div style="background-color: #fff; padding: 15px; border-radius: 4px; margin: 10px 0;">
            ${backupCodes.map(code => `
              <div style="font-family: monospace; font-size: 16px; padding: 5px 0; border-bottom: 1px solid #e5e7eb;">
                ${code}
              </div>
            `).join('')}
          </div>
        </div>
        
        <div style="background-color: #fee2e2; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <p style="color: #dc2626; margin: 0; font-size: 14px;">
            <strong>⚠️ Important:</strong> 
            - These backup codes will not be shown again<br>
            - Each code can only be used once<br>
            - Store them in a secure password manager or safe location
          </p>
        </div>
        
        <div style="background-color: #dcfce7; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <p style="color: #166534; margin: 0;">
            <strong>✅ 2FA is now active:</strong> 
            You'll need to enter a verification code from your authenticator app each time you log in.
          </p>
        </div>
      </div>
    `;

    await mailer.sendMail({
      from: `"Phluxo Security" <${process.env.GMAIL_USER}>`,
      to: user.email,
      subject: "Two-Factor Authentication Enabled - Phluxo",
      html: backupCodesEmail
    });

    res.json({
      success: true,
      message: "2FA enabled successfully!",
      backupCodes: backupCodes,
      warning: "Save these backup codes in a secure place. They won't be shown again."
    });

  } catch (error) {
    console.error("Verify 2FA setup error:", error);
    res.status(500).json({
      success: false,
      message: "Error verifying 2FA",
      error: error.message
    });
  }
};

//Disable 2Fa
export const disable2FA = async (req, res) => {
  try {
    const { password } = req.body;
    const user = await User.findById(req.user.id).select('+password');

    if (!user.twoFactorAuth.enabled) {
      return res.status(400).json({
        success: false,
        message: "2FA is not enabled"
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password"
      });
    }

    user.twoFactorAuth.enabled = false;
    user.twoFactorAuth.secret = undefined;
    user.twoFactorAuth.backupCodes = [];
    await user.save();

    res.json({
      success: true,
      message: "2FA disabled successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error disabling 2FA",
      error: error.message
    });
  }
};

//Generate new BackUp codes
export const generateBackupCodes = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.twoFactorAuth || !user.twoFactorAuth.enabled) {
      return res.status(400).json({
        success: false,
        message: "2FA is not enabled"
      });
    }

    const backupCodes = Array.from({ length: 8 }, () =>
      Math.random().toString(36).substring(2, 8).toUpperCase()
    );

    // Hash backup codes before storing
    user.twoFactorAuth.backupCodes = backupCodes.map(code => ({
      code: hashBackupCode(code),
      used: false
    }));
    await user.save();

    const emailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #2563eb; margin: 0;">Phluxo</h2>
          <p style="color: #6b7280; margin: 5px 0;">New Backup Codes Generated</p>
        </div>
        
        <h3 style="color: #1f2937;">Hello ${user.name},</h3>
        
        <p style="color: #4b5563; line-height: 1.6;">
          You've successfully generated new backup codes for your Two-Factor Authentication.
          <strong>Your previous backup codes are no longer valid.</strong>
        </p>
        
        <div style="background-color: #fef3cd; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <h4 style="color: #92400e; margin-top: 0;">🔐 Your New Backup Codes:</h4>
          <p style="color: #92400e; margin: 5px 0;">
            Save these new backup codes in a secure place. Each code can be used once if you lose access to your authenticator app.
          </p>
          <div style="background-color: #fff; padding: 15px; border-radius: 4px; margin: 10px 0; border: 2px solid #f59e0b;">
            ${backupCodes.map((code, index) => `
              <div style="font-family: monospace; font-size: 16px; padding: 8px 0; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between;">
                <span>${index + 1}.</span>
                <span style="font-weight: bold; letter-spacing: 2px;">${code}</span>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div style="background-color: #fee2e2; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <p style="color: #dc2626; margin: 0; font-size: 14px;">
            <strong>⚠️ Important Security Notice:</strong><br>
            - These backup codes replace all previous codes<br>
            - Old backup codes are no longer valid<br>
            - Each code can only be used once<br>
            - Store them in a secure password manager or safe location<br>
            - These codes will not be shown again in the app
          </p>
        </div>
        
        <div style="background-color: #dbeafe; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <h4 style="color: #1e40af; margin-top: 0;">📝 When to Use Backup Codes:</h4>
          <ul style="color: #1e40af; padding-left: 20px;">
            <li>If you lose your phone with the authenticator app</li>
            <li>If you get a new phone and need to transfer 2FA</li>
            <li>If the authenticator app stops working</li>
            <li>Emergency access when you can't generate codes</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 25px 0;">
          <p style="color: #6b7280; font-size: 14px;">
            You requested new backup codes on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
          </p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;">
        
        <div style="text-align: center;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            This is an automated security message from Phluxo.<br>
            If you didn't request new backup codes, please secure your account immediately.
          </p>
        </div>
      </div>
    `;

    await mailer.sendMail({
      from: `"Phluxo Security" <${process.env.GMAIL_USER}>`,
      to: user.email,
      subject: "New Backup Codes Generated - Phluxo",
      html: emailTemplate
    });

    res.json({
      success: true,
      message: "New backup codes generated and sent to your email",
      backupCodes: backupCodes,
      warning: "Save these new backup codes securely. Old codes are no longer valid.",
      emailSent: true
    });

  } catch (error) {
    console.error("Generate backup codes error:", error);

    if (error.message.includes("email") || error.message.includes("mailer")) {
      return res.status(200).json({
        success: true,
        message: "Backup codes generated but failed to send email. Please save these codes now.",
        backupCodes: backupCodes,
        warning: "Save these codes immediately. They won't be shown again.",
        emailSent: false
      });
    }

    res.status(500).json({
      success: false,
      message: "Error generating backup codes",
      error: error.message
    });
  }
};
