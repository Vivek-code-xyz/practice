// Redis client with graceful fallback for development
// In production, ensure Redis is running

// In-memory store for when Redis is unavailable
const memoryStore = new Map();

// Timer to clean up expired keys
setInterval(() => {
  const now = Date.now();
  for (const [key, item] of memoryStore.entries()) {
    if (item.expiresAt && now > item.expiresAt) {
      memoryStore.delete(key);
    }
  }
}, 60000); // Clean every minute

// Fallback Redis-like client using memory
const createMemoryClient = () => {
  return {
    async get(key) {
      const item = memoryStore.get(key);
      if (!item) return null;
      if (item.expiresAt && Date.now() > item.expiresAt) {
        memoryStore.delete(key);
        return null;
      }
      return item.value;
    },
    async set(key, value, mode, duration) {
      let expiresAt = null;
      if (mode === 'EX' && duration) {
        expiresAt = Date.now() + (duration * 1000);
      }
      memoryStore.set(key, { value: String(value), expiresAt });
      return 'OK';
    },
    async incr(key) {
      const item = memoryStore.get(key);
      const currentValue = item ? parseInt(item.value) || 0 : 0;
      const newValue = currentValue + 1;
      const expiresAt = item?.expiresAt || null;
      memoryStore.set(key, { value: String(newValue), expiresAt });
      return newValue;
    },
    async expire(key, seconds) {
      const item = memoryStore.get(key);
      if (item) {
        item.expiresAt = Date.now() + (seconds * 1000);
        memoryStore.set(key, item);
        return 1;
      }
      return 0;
    },
    async del(key) {
      return memoryStore.delete(key) ? 1 : 0;
    },
    multi() {
      const commands = [];
      const self = this;
      return {
        incr(key) { commands.push({ cmd: 'incr', key }); return this; },
        expire(key, seconds) { commands.push({ cmd: 'expire', key, seconds }); return this; },
        async exec() {
          const results = [];
          for (const { cmd, key, seconds } of commands) {
            if (cmd === 'incr') {
              results.push([null, await self.incr(key)]);
            } else if (cmd === 'expire') {
              results.push([null, await self.expire(key, seconds)]);
            }
          }
          return results;
        }
      };
    }
  };
};

// Create the client (memory-based for now, can be extended to use Redis)
export const redisClient = createMemoryClient();

// Rate limiting helper
export const rateLimit = async (key, maxRequests, windowMs) => {
  const current = await redisClient.get(key);

  if (current && parseInt(current) >= maxRequests) {
    return { limited: true, remaining: 0 };
  }

  const multi = redisClient.multi();
  multi.incr(key);
  multi.expire(key, Math.ceil(windowMs / 1000));
  await multi.exec();

  return { limited: false, remaining: maxRequests - (parseInt(current || 0) + 1) };
};

console.log('⚠️ Using in-memory storage (Redis fallback)');