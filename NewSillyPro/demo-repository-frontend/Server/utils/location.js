import axios from 'axios';
import { getClientIP } from './ip.js';

// Cache for location requests
const locationCache = new Map();
const CACHE_TTL = 3600000; // 1 hour

/**
 * Get location information from IP address
 * @param {string} ip - IP address
 * @returns {Promise<Object>} Location object
 */
export const getLocationFromIP = async (ip) => {
  try {
    // Validate IP
    if (!ip || ip === '127.0.0.1' || ip === '::1') {
      return getLocalLocation();
    }
    
    // Check cache
    const cacheKey = `location:${ip}`;
    const cached = locationCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }
    
    // Use ipapi.co (free tier: 1000 requests/month)
    const response = await axios.get(`https://ipapi.co/${ip}/json/`, {
      timeout: 3000,
      headers: {
        'User-Agent': 'LifeOS-Server/1.0'
      }
    });
    
    if (response.data && response.data.country_code) {
      const locationData = {
        ip: ip,
        country: response.data.country_name || 'Unknown',
        countryCode: response.data.country_code,
        region: response.data.region || response.data.region_code || 'Unknown',
        city: response.data.city || 'Unknown',
        latitude: parseFloat(response.data.latitude) || null,
        longitude: parseFloat(response.data.longitude) || null,
        timezone: response.data.timezone || 'UTC',
        currency: response.data.currency || 'USD',
        languages: response.data.languages || 'en',
        asn: response.data.asn || 'Unknown',
        org: response.data.org || 'Unknown',
        source: 'ipapi.co'
      };
      
      // Cache the result
      locationCache.set(cacheKey, {
        data: locationData,
        timestamp: Date.now()
      });
      
      return locationData;
    }
    
    // Fallback to ip-api.com
    return await getLocationFallback(ip);
    
  } catch (error) {
    console.error('Error getting location from IP:', error.message);
    return getFallbackLocation(ip);
  }
};

/**
 * Fallback location service (ip-api.com)
 */
const getLocationFallback = async (ip) => {
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}?fields=status,country,countryCode,region,regionName,city,lat,lon,timezone,isp,org,as,query`, {
      timeout: 3000
    });
    
    if (response.data.status === 'success') {
      return {
        ip: response.data.query,
        country: response.data.country || 'Unknown',
        countryCode: response.data.countryCode,
        region: response.data.regionName || response.data.region || 'Unknown',
        city: response.data.city || 'Unknown',
        latitude: parseFloat(response.data.lat) || null,
        longitude: parseFloat(response.data.lon) || null,
        timezone: response.data.timezone || 'UTC',
        isp: response.data.isp || 'Unknown',
        org: response.data.org || 'Unknown',
        as: response.data.as || 'Unknown',
        source: 'ip-api.com'
      };
    }
  } catch (error) {
    console.error('Fallback location service failed:', error.message);
  }
  
  return getFallbackLocation(ip);
};

/**
 * Get local location (for development/localhost)
 */
const getLocalLocation = () => {
  return {
    ip: '127.0.0.1',
    country: 'Local',
    countryCode: 'LOCAL',
    region: 'Development',
    city: 'Localhost',
    latitude: null,
    longitude: null,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    isp: 'Local Network',
    org: 'Development',
    as: 'Local',
    source: 'local'
  };
};

/**
 * Ultimate fallback location
 */
const getFallbackLocation = (ip) => {
  return {
    ip: ip,
    country: 'Unknown',
    countryCode: 'UN',
    region: 'Unknown',
    city: 'Unknown',
    latitude: null,
    longitude: null,
    timezone: 'UTC',
    isp: 'Unknown',
    org: 'Unknown',
    as: 'Unknown',
    source: 'fallback'
  };
};

/**
 * Format location for display
 * @param {Object} location - Location object
 * @returns {string} Formatted location string
 */
export const formatLocation = (location) => {
  if (!location) return 'Unknown location';
  
  const parts = [];
  if (location.city && location.city !== 'Unknown') parts.push(location.city);
  if (location.region && location.region !== 'Unknown') parts.push(location.region);
  if (location.country && location.country !== 'Unknown') parts.push(location.country);
  
  return parts.length > 0 ? parts.join(', ') : 'Unknown location';
};

/**
 * Clear location cache
 */
export const clearLocationCache = () => {
  locationCache.clear();
  console.log('Location cache cleared');
};

// Clear cache every 6 hours
setInterval(clearLocationCache, 6 * 3600000);

export default {
  getLocationFromIP,
  formatLocation,
  clearLocationCache
};