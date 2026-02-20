import crypto from 'crypto';

/**
 * Generate device fingerprint from request
 * @param {Object} req - Express request object
 * @returns {string} Device fingerprint hash
 */
export const getDeviceId = (req) => {
  try {
    const components = [
      req.headers['user-agent'] || '',
      req.headers['accept-language'] || '',
      req.headers['accept-encoding'] || '',
      req.headers['accept'] || '',
      req.headers['connection'] || '',
      req.headers['sec-ch-ua'] || '',
      req.headers['sec-ch-ua-platform'] || '',
      req.headers['sec-ch-ua-mobile'] || '',
      req.headers['dnt'] || '',
      req.headers['upgrade-insecure-requests'] || '',
    ];
    
    // Add screen info if available (from frontend)
    if (req.body?.screenInfo) {
      components.push(JSON.stringify(req.body.screenInfo));
    }
    
    // Add timezone if available
    if (req.body?.timezone) {
      components.push(req.body.timezone);
    }
    
    // Create deterministic hash
    const deviceString = components.join('|');
    const hash = crypto
      .createHash('sha256')
      .update(deviceString + (process.env.DEVICE_SALT || 'lifeos-device-salt-2024'))
      .digest('hex')
      .substring(0, 32); // 32 characters (16 bytes)
    
    return hash;
    
  } catch (error) {
    console.error('Error generating device ID:', error);
    
    // Fallback: hash of user-agent and timestamp
    const fallbackString = (req.headers['user-agent'] || 'unknown') + Date.now();
    return crypto
      .createHash('sha256')
      .update(fallbackString)
      .digest('hex')
      .substring(0, 32);
  }
};

/**
 * Parse user agent for device info
 * @param {string} userAgent - User agent string
 * @returns {Object} Device information
 */
export const parseUserAgent = (userAgent) => {
  const ua = userAgent || '';
  
  // Detect device type
  let deviceType = 'desktop';
  let isMobile = false;
  let isTablet = false;
  let isDesktop = true;
  
  if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile/i.test(ua)) {
    deviceType = 'mobile';
    isMobile = true;
    isDesktop = false;
  } else if (/tablet|ipad|playbook|silk/i.test(ua)) {
    deviceType = 'tablet';
    isTablet = true;
    isDesktop = false;
  }
  
  // Detect browser
  let browser = 'Unknown';
  let browserVersion = '';
  
  if (/chrome|chromium/i.test(ua)) {
    browser = 'Chrome';
    const match = ua.match(/chrome\/(\d+\.\d+)/i);
    browserVersion = match ? match[1] : '';
  } else if (/firefox|fxios/i.test(ua)) {
    browser = 'Firefox';
    const match = ua.match(/firefox\/(\d+\.\d+)/i);
    browserVersion = match ? match[1] : '';
  } else if (/safari/i.test(ua) && !/chrome/i.test(ua)) {
    browser = 'Safari';
    const match = ua.match(/version\/(\d+\.\d+)/i);
    browserVersion = match ? match[1] : '';
  } else if (/edge|edg/i.test(ua)) {
    browser = 'Edge';
    const match = ua.match(/edge\/(\d+\.\d+)/i);
    browserVersion = match ? match[1] : '';
  } else if (/opera|opr/i.test(ua)) {
    browser = 'Opera';
    const match = ua.match(/(?:opera|opr)\/(\d+\.\d+)/i);
    browserVersion = match ? match[1] : '';
  }
  
  // Detect OS
  let os = 'Unknown';
  let osVersion = '';
  
  if (/windows nt/i.test(ua)) {
    os = 'Windows';
    const match = ua.match(/windows nt (\d+\.\d+)/i);
    osVersion = match ? match[1] : '';
  } else if (/mac os x|macintosh/i.test(ua)) {
    os = 'macOS';
    const match = ua.match(/mac os x (\d+[._]\d+)/i);
    osVersion = match ? match[1].replace('_', '.') : '';
  } else if (/linux/i.test(ua)) {
    os = 'Linux';
  } else if (/android/i.test(ua)) {
    os = 'Android';
    const match = ua.match(/android (\d+\.\d+)/i);
    osVersion = match ? match[1] : '';
  } else if (/iphone|ipad|ipod/i.test(ua)) {
    os = 'iOS';
    const match = ua.match(/os (\d+[._]\d+)/i);
    osVersion = match ? match[1].replace('_', '.') : '';
  }
  
  return {
    deviceType,
    isMobile,
    isTablet,
    isDesktop,
    browser: {
      name: browser,
      version: browserVersion,
      major: browserVersion ? browserVersion.split('.')[0] : ''
    },
    os: {
      name: os,
      version: osVersion
    },
    userAgent: ua
  };
};

/**
 * Generate human-readable device name
 * @param {Object} deviceInfo - Device info from parseUserAgent
 * @returns {string} Device name
 */
export const generateDeviceName = (deviceInfo) => {
  const parts = [];
  
  if (deviceInfo.deviceType !== 'desktop') {
    parts.push(deviceInfo.deviceType.charAt(0).toUpperCase() + deviceInfo.deviceType.slice(1));
  }
  
  if (deviceInfo.os.name !== 'Unknown') {
    parts.push(deviceInfo.os.name);
  }
  
  if (deviceInfo.browser.name !== 'Unknown') {
    parts.push(deviceInfo.browser.name);
  }
  
  if (parts.length === 0) {
    return 'Unknown Device';
  }
  
  return parts.join(' ');
};

/**
 * Check if user agent indicates a bot/crawler
 * @param {string} userAgent - User agent string
 * @returns {boolean} True if likely a bot
 */
export const isBot = (userAgent) => {
  if (!userAgent) return false;
  
  const lowerUA = userAgent.toLowerCase();
  
  // Common bot patterns
  const botPatterns = [
    'bot', 'crawl', 'spider', 'scrape', 'curl', 'wget', 'python',
    'java', 'php', 'ruby', 'perl', 'go-http', 'axios', 'http-client',
    'libwww', 'lwp', 'fetch', 'get', 'post', 'head', 'request',
    'apache', 'nginx', 'googlebot', 'bingbot', 'slurp', 'duckduckbot',
    'baiduspider', 'yandexbot', 'facebook', 'twitter', 'whatsapp',
    'telegram', 'discord', 'skype', 'slack', 'microsoft', 'applebot',
    'semrush', 'ahrefs', 'moz', 'seo', 'rank', 'analytics', 'monitor',
    'uptime', 'check', 'ping', 'scan', 'security', 'test', 'debug'
  ];
  
  // Exact bot names
  const exactBots = [
    'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider',
    'yandexbot', 'facebookexternalhit', 'twitterbot', 'linkedinbot',
    'whatsapp', 'telegrambot', 'discordbot', 'slackbot', 'applebot',
    'semrushbot', 'ahrefsbot', 'mozbot'
  ];
  
  // Check exact matches
  if (exactBots.some(bot => lowerUA.includes(bot))) {
    return true;
  }
  
  // Check patterns
  if (botPatterns.some(pattern => lowerUA.includes(pattern))) {
    return true;
  }
  
  // Check for common bot headers
  if (lowerUA.includes('mozilla/5.0 (compatible;') || 
      lowerUA.includes('mozilla/5.0 (+http') ||
      lowerUA.includes('mozilla/5.0 (+https')) {
    return true;
  }
  
  return false;
};

/**
 * Extract screen info from request (if sent by frontend)
 * @param {Object} req - Express request object
 * @returns {Object} Screen information
 */
export const getScreenInfoFromRequest = (req) => {
  try {
    const screenInfo = req.body?.screenInfo || req.query?.screenInfo;
    
    if (screenInfo && typeof screenInfo === 'object') {
      return {
        width: parseInt(screenInfo.width) || null,
        height: parseInt(screenInfo.height) || null,
        pixelRatio: parseFloat(screenInfo.pixelRatio) || 1,
        colorDepth: parseInt(screenInfo.colorDepth) || 24,
        orientation: screenInfo.orientation || 'landscape-primary'
      };
    }
    
    return {
      width: null,
      height: null,
      pixelRatio: null,
      colorDepth: null,
      orientation: null
    };
  } catch (error) {
    return {
      width: null,
      height: null,
      pixelRatio: null,
      colorDepth: null,
      orientation: null
    };
  }
};

export default {
  getDeviceId,
  parseUserAgent,
  generateDeviceName,
  isBot,
  getScreenInfoFromRequest
};