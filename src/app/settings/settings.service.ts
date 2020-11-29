// @ts-nocheck

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor() {}

  updateMultiple(settings: { key: string; value: string }): void {
    for (const settingsKey in settings) {
      if (settings.hasOwnProperty(settingsKey)) {
        this.set({ key: settingsKey, value: settings[settingsKey] });
      }
    }
  }

  set({ key, value }: { key: string; value: string }): void {
    localStorage.setItem(key, value);
  }

  get(key: string): string {
    return localStorage.getItem(key) || '';
  }
}
