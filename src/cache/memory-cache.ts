interface CacheItem<T> {
  data: T;
  timestamp: number;
}

class MemoryCache {
  private cache: Map<string, CacheItem<any>>;
  private ttl: number;

  constructor(ttlMs: number = 3600000) {
    this.cache = new Map();
    this.ttl = ttlMs;
  }

  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);

    if (!item) {
      return null;
    }

    const isExpired = Date.now() - item.timestamp > this.ttl;

    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  clear(): void {
    this.cache.clear();
  }

  has(key: string): boolean {
    return this.cache.has(key) && this.get(key) !== null;
  }
}

export const memoryCache = new MemoryCache();
