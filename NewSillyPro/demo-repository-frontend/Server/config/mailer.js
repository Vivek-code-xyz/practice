import nodemailer from 'nodemailer';

let transporter = null;
let isInitialized = false;

const emailLimits = new Map();

const initializeMailer = () => {
  if (isInitialized) return transporter;

  // Validate environment variables
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    console.error('ERROR: Gmail credentials not found in environment variables');
    console.error('Make sure .env file is loaded with GMAIL_USER and GMAIL_PASS');
    throw new Error('Email configuration missing');
  }

  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    },
    pool: true,
    maxConnections: 5,
    maxMessages: 50,
    rateLimit: 5,
    tls: {
      rejectUnauthorized: false
    }
  });

  // Verify connection
  transporter.verify((error) => {
    if (error) {
      console.error('Mailer connection failed:', error.message);
    } else {
      console.log('Mailer ready and connected');
      isInitialized = true;
    }
  });

  return transporter;
};

const canSendEmail = (to, type) => {
  const key = `${to}:${type}`;
  const now = Date.now();
  const limit = emailLimits.get(key);

  if (!limit) {
    emailLimits.set(key, { count: 1, timestamp: now });
    return true;
  }

  // Reset after 1 hour
  if (now - limit.timestamp > 3600000) {
    emailLimits.set(key, { count: 1, timestamp: now });
    return true;
  }

  // Check limits
  const maxEmails = {
    verification: 3,
    password_reset: 3,
    security: 10,
    general: 5
  };

  if (limit.count >= (maxEmails[type] || 5)) {
    return false;
  }

  limit.count++;
  return true;
};

export const sendEmail = async (options) => {
  try {
    const { to, subject, html, type = 'general' } = options;

    // Initialize mailer if not already done
    if (!transporter) {
      initializeMailer();
    }

    // Check rate limits
    if (!canSendEmail(to, type)) {
      throw new Error(`Rate limit exceeded for ${to}`);
    }

    const mailOptions = {
      from: `"Phluxo" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
      text: html.replace(/<[^>]*>/g, '')
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
    return info;
  } catch (error) {
    console.error('Email sending failed:', error.message);
    throw error;
  }
};

const getTransporter = () => {
  if (!transporter) {
    initializeMailer();
  }
  return transporter;
};

export const mailer = {
  get transporter() {
    return getTransporter();
  },
  sendEmail,
  sendMail: (mailOptions) => getTransporter().sendMail(mailOptions)
};