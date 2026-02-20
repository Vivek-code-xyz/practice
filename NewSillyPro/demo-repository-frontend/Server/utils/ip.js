/**
 * Get client IP address from request with enhanced security
 * @param {Object} req - Express request object
 * @returns {string} Client IP address
 */
export const getClientIP = (req) => {
  // Check Cloudflare header first
  const cfIP = req.headers['cf-connecting-ip'];
  if (cfIP) {
    return cfIP.split(',')[0].trim();
  }
  
  // Check forwarded headers (for proxies)
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    // Could be comma-separated list of IPs
    const ips = forwarded.split(',').map(ip => ip.trim());
    // Return the first IP (client IP)
    const clientIP = ips[0];
    // Validate IP format
    if (isValidIP(clientIP)) {
      return clientIP;
    }
  }
  
  // Check other common headers
  const realIP = req.headers['x-real-ip'];
  if (realIP && isValidIP(realIP)) {
    return realIP;
  }
  
  // Fallback to socket/connection
  const socketIP = req.socket?.remoteAddress || req.connection?.remoteAddress;
  if (socketIP && socketIP !== '::1' && socketIP !== '127.0.0.1') {
    return socketIP;
  }
  
  // Use req.ip (if Express trust proxy is configured)
  if (req.ip && req.ip !== '::1' && req.ip !== '127.0.0.1') {
    return req.ip;
  }
  
  // Default fallback
  return '127.0.0.1';
};

/**
 * Validate IP address format (IPv4 or IPv6)
 * @param {string} ip - IP address to validate
 * @returns {boolean} True if valid IP
 */
export const isValidIP = (ip) => {
  if (!ip || typeof ip !== 'string') return false;
  
  // Handle IPv4-mapped IPv6 addresses
  if (ip.startsWith('::ffff:')) {
    ip = ip.substring(7); // Remove ::ffff: prefix
  }
  
  // IPv4 pattern
  const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  
  // IPv6 pattern
  const ipv6Pattern = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
  
  return ipv4Pattern.test(ip) || ipv6Pattern.test(ip);
};

/**
 * Get IP prefix (first 3 octets for IPv4, first 4 groups for IPv6)
 * Useful for grouping similar IPs without tracking exact IP
 * @param {string} ip - IP address
 * @returns {string} IP prefix
 */
export const getIPPrefix = (ip) => {
  if (!ip || !isValidIP(ip)) return 'invalid';
  
  // Handle IPv4
  if (ip.includes('.')) {
    const parts = ip.split('.');
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.x`;
    }
  }
  
  // Handle IPv6
  if (ip.includes(':')) {
    const parts = ip.split(':');
    if (parts.length >= 4) {
      return `${parts[0]}:${parts[1]}:${parts[2]}:${parts[3]}::x`;
    }
  }
  
  return ip;
};

/**
 * Check if IP is local/private
 * @param {string} ip - IP address
 * @returns {boolean} True if private IP
 */
export const isPrivateIP = (ip) => {
  if (!ip || !isValidIP(ip)) return true;
  
  // Localhost
  if (ip === '127.0.0.1' || ip === '::1' || ip === 'localhost') {
    return true;
  }
  
  // IPv4-mapped IPv6 localhost
  if (ip === '::ffff:127.0.0.1') {
    return true;
  }
  
  // Private IP ranges
  const privateRanges = [
    /^10\./,                            // 10.0.0.0 - 10.255.255.255
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./,   // 172.16.0.0 - 172.31.255.255
    /^192\.168\./,                      // 192.168.0.0 - 192.168.255.255
    /^169\.254\./,                      // Link-local
    /^fd[0-9a-f]{2}:/i,                 // IPv6 unique local addresses (fc00::/7)
    /^fe80:/i,                          // IPv6 link-local
    /^::ffff:(10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.|192\.168\.|169\.254\.)/ // IPv4-mapped IPv6
  ];
  
  return privateRanges.some(range => range.test(ip));
};

/**
 * Sanitize IP address for logging/storage
 * @param {string} ip - IP address
 * @returns {string} Sanitized IP (hashed for privacy)
 */
export const sanitizeIP = (ip) => {
  if (!ip || !isValidIP(ip)) return 'invalid';
  
  if (process.env.NODE_ENV === 'production' && isPrivateIP(ip)) {
    // For production, hash private IPs
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(ip + process.env.IP_SALT).digest('hex').substring(0, 16);
  }
  
  return ip;
};

/**
 * Check if IP should be rate limited
 * @param {string} ip - IP address
 * @returns {boolean} True if should be rate limited
 */
export const shouldRateLimitIP = (ip) => {
  // Don't rate limit localhost in development
  if (process.env.NODE_ENV === 'development' && isPrivateIP(ip)) {
    return false;
  }
  
  // Rate limit all IPs in production
  return true;
};

export default {
  getClientIP,
  isValidIP,
  getIPPrefix,
  isPrivateIP,
  sanitizeIP,
  shouldRateLimitIP
};