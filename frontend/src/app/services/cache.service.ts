import { Injectable } from '@angular/core';

interface CacheEntry<T> {
  value: T;
  expiry: number; // Expiry timestamp in milliseconds
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache = new Map<string, CacheEntry<any>>();
  private readonly storageKey = 'app-cache';

  constructor() {
    this.loadFromStorage();
  }

  /**
   * Sets a value in the cache.
   * @param key The cache key.
   * @param value The data to cache.
   * @param ttl Time-to-live in milliseconds (default: 5 minutes).
   * @param persistent Whether the cache should persist to session storage.
   */
  set<T>(key: string, value: T, ttl: number = 5 * 60 * 1000, persistent = false): void {
    const expiry = Date.now() + ttl;
    const entry: CacheEntry<T> = { value, expiry };

    this.cache.set(key, entry);

    if (persistent) {
      this.saveToStorage(key, entry);
    }
  }

  /**
   * Gets a value from the cache.
   * @param key The cache key.
   * @returns The cached data or null if expired/not found.
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      this.removeFromStorage(key);
      return null;
    }

    return entry.value;
  }

  /**
   * Deletes a value from the cache.
   * @param key The cache key.
   */
  delete(key: string): void {
    this.cache.delete(key);
    this.removeFromStorage(key);
  }

  /**
   * Clears the entire cache.
   */
  clear(): void {
    this.cache.clear();
    sessionStorage.removeItem(this.storageKey);
  }

  /**
   * Saves a cache entry to sessionStorage.
   */
  private saveToStorage<T>(key: string, entry: CacheEntry<T>): void {
    const existingStorage = this.loadStorage();
    existingStorage[key] = entry;
    sessionStorage.setItem(this.storageKey, JSON.stringify(existingStorage));
  }

  /**
   * Removes a cache entry from sessionStorage.
   */
  private removeFromStorage(key: string): void {
    const existingStorage = this.loadStorage();
    delete existingStorage[key];
    sessionStorage.setItem(this.storageKey, JSON.stringify(existingStorage));
  }

  /**
   * Loads cache from sessionStorage on initialization.
   */
  private loadFromStorage(): void {
    const existingStorage = this.loadStorage();
    for (const [key, entry] of Object.entries(existingStorage)) {
      const parsedEntry: CacheEntry<any> = entry as CacheEntry<any>;
      // Only add valid, non-expired entries
      if (Date.now() <= parsedEntry.expiry) {
        this.cache.set(key, parsedEntry);
      } else {
        this.removeFromStorage(key);
      }
    }
  }

  /**
   * Loads the raw cache object from sessionStorage.
   */
  private loadStorage(): Record<string, CacheEntry<any>> {
    const raw = sessionStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : {};
  }
}
