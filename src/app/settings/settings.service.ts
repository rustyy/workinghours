import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private STORAGE_KEY = 'latestRecords';

  constructor() {}

  updateSettings(settings): void {
    for (const settingsKey in settings) {
      if (settings.hasOwnProperty(settingsKey)) {
        this.updateSetting({ key: settingsKey, value: settings[settingsKey] });
      }
    }
  }

  updateSetting({ key, value }): void {
    localStorage.setItem(key, value);
  }

  getSetting(key): string {
    return localStorage.getItem(key) || '';
  }

  public settingsSave(id, record) {
    const weekday = moment(record.date).isoWeekday();
    const latestRecords = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
    const update = {
      latest: id,
      [weekday]: id
    };

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(Object.assign(latestRecords, update)));
  }

  public settingsGet() {
    const latest: any = localStorage.getItem(this.STORAGE_KEY);
    return latest ? JSON.parse(latest) : {};
  }

  public settingsDelete(id: number) {
    const settings = this.settingsGet();

    if (settings.id === id) {
      delete settings.id;
    }

    if (settings[id]) {
      delete settings[id];
    }

    this.settingsUpdate(settings);
  }

  public settingsUpdate(settings): void {
    return localStorage.setItem(this.STORAGE_KEY, settings);
  }
}
