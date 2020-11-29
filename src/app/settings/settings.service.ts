import { Injectable } from '@angular/core';

interface ISetting {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor() {}

  updateMultiple(settings: ISetting): void {
    for (const key in settings) {
      if (settings.hasOwnProperty(key)) {
        const value = settings[key];
        this.set(key, value);
      }
    }
  }

  set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  get(key: string): string | null {
    return localStorage.getItem(key);
  }
}
