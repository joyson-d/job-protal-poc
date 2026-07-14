import { Injectable, signal } from '@angular/core';
import { SettingsStorage } from './settings-storage';
import { AppSettings } from './settings.model';
import { SettingsStore } from './settings-store';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(
    private readonly settingsStorage: SettingsStorage,
    private readonly settingsStore: SettingsStore,
  ) {
    this.initialize();
  }

  private initialize(): void {
    const storedSettings = this.settingsStorage.getSettings();

    if (storedSettings) {
      this.settingsStore.setSettings(storedSettings);
    } else {
      this.setLanguage('en');
    }
  }

  setLanguage(language: string): void {
    const updatedSettings: AppSettings = {
      language,
    };

    this.settingsStore.setSettings(updatedSettings);

    this.settingsStorage.setSettings(updatedSettings);
  }

  get currentLanguage() {
    return this.settingsStore.language;
  }
}
