import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

class RedisCache {
  private client: Redis | null = null;
  private isConnected = false;
  private fallbackCache = new Map<string, { value: any; expiresAt?: number }>();

  constructor() {
    try {
      this.client = new Redis(redisUrl, {
        lazyConnect: true,
        maxRetriesPerRequest: 1,
        retryStrategy: (times) => (times > 3 ? null : 100),
      });

      this.client.on('connect', () => {
        this.isConnected = true;
      });

      this.client.on('error', (err) => {
        this.isConnected = false;
      });
    } catch {
      this.isConnected = false;
    }
  }

  private async ensureConnection() {
    if (this.client && !this.isConnected && this.client.status === 'wait') {
      try {
        await this.client.connect();
        this.isConnected = true;
      } catch {
        this.isConnected = false;
      }
    }
  }

  async getCache<T>(key: string): Promise<T | null> {
    await this.ensureConnection();
    if (this.isConnected && this.client) {
      try {
        const data = await this.client.get(key);
        return data ? (JSON.parse(data) as T) : null;
      } catch {
        // Fall back to memory
      }
    }

    const memoryItem = this.fallbackCache.get(key);
    if (!memoryItem) return null;
    if (memoryItem.expiresAt && Date.now() > memoryItem.expiresAt) {
      this.fallbackCache.delete(key);
      return null;
    }
    return memoryItem.value as T;
  }

  async setCache<T>(key: string, value: T, ttlSeconds = 3600): Promise<void> {
    await this.ensureConnection();
    const payload = JSON.stringify(value);

    if (this.isConnected && this.client) {
      try {
        if (ttlSeconds > 0) {
          await this.client.setex(key, ttlSeconds, payload);
        } else {
          await this.client.set(key, payload);
        }
        return;
      } catch {
        // Fall back to memory
      }
    }

    const expiresAt = ttlSeconds > 0 ? Date.now() + ttlSeconds * 1000 : undefined;
    this.fallbackCache.set(key, { value, expiresAt });
  }

  async invalidatePattern(pattern: string): Promise<void> {
    await this.ensureConnection();
    if (this.isConnected && this.client) {
      try {
        const keys = await this.client.keys(pattern);
        if (keys.length > 0) {
          await this.client.del(...keys);
        }
      } catch {
        // Ignore fallback clear
      }
    }

    const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
    for (const key of this.fallbackCache.keys()) {
      if (regex.test(key)) {
        this.fallbackCache.delete(key);
      }
    }
  }
}

export const redis = new RedisCache();
