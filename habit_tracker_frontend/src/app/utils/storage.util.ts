export class StorageUtil {
  // lightweight structural type to avoid referencing DOM 'Storage' in lint context
  private static get storage(): { getItem: (k: string) => string | null; setItem: (k: string, v: string) => void } | null {
    try {
      const g: any = typeof globalThis !== 'undefined' ? (globalThis as any) : {};
      if (g.localStorage && typeof g.localStorage.getItem === 'function' && typeof g.localStorage.setItem === 'function') {
        return g.localStorage as any;
      }
      return null;
    } catch {
      return null;
    }
  }

  static getJSON<T>(key: string, fallback: T): T {
    try {
      const store = StorageUtil.storage;
      if (!store) return fallback;
      const raw = store.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  }

  static setJSON<T>(key: string, value: T): void {
    try {
      const store = StorageUtil.storage;
      if (!store) return;
      store.setItem(key, JSON.stringify(value));
    } catch {
      // ignore storage errors
    }
  }
}

// PUBLIC_INTERFACE
export function todayKey(date = new Date()): string {
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// PUBLIC_INTERFACE
export function lastNDates(n: number, from = new Date()): string[] {
  const dates: string[] = [];
  const base = new Date(from);
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(base);
    d.setDate(base.getDate() - i);
    dates.push(todayKey(d));
  }
  return dates;
}
