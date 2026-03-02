import type { StorageData } from '../types';

const STORAGE_KEY = 'water-kefir-data';

export function saveData(data: Partial<StorageData>): void {
  try {
    const existing = loadData() ?? {};
    const merged = { ...existing, ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // localStorage niet beschikbaar
  }
}

export function loadData(): Partial<StorageData> | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Partial<StorageData>;
  } catch {
    return null;
  }
}

export function clearData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // localStorage niet beschikbaar
  }
}
