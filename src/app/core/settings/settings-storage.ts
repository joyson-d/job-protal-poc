import { Injectable } from '@angular/core';
import { AppSettings } from './settings.model';
import { SETTINGS_STORAGE_KEY } from '../constant';

@Injectable({
  providedIn: 'root',
})
export class SettingsStorage {
  getSettings(): AppSettings | null {
    const data = localStorage.getItem(SETTINGS_STORAGE_KEY);
    
    return data ? JSON.parse(data) : null;
  }

  setSettings(settings: AppSettings) {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }
}
