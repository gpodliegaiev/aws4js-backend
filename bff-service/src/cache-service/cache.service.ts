import { Injectable } from '@nestjs/common';

interface CacheRecord {
  value: any;
  timestamp: number;
}

@Injectable()
export class CacheService {
  private cachingTime = 120000;
  private cache = new Map<string, CacheRecord>();

  private isCacheValid(cacheRecord: CacheRecord): boolean {
    return Date.now() - cacheRecord.timestamp < this.cachingTime;
  }

  getCachedValue(key: string): any {
    const cacheRecord = this.cache.get(key);

    if (cacheRecord && this.isCacheValid(cacheRecord)) {
      return cacheRecord.value;
    }

    return undefined;
  }

  addValueToCache(key: string, value: any) {
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
    });
  }
}
