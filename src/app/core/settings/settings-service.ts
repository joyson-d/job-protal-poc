import { Injectable, signal } from '@angular/core';
import { SettingsStorage } from './settings-storage';
import { AppSettings } from './settings.model';
import { SettingsStore } from './settings-store';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(
    private readonly translateService: TranslateService,
    private readonly settingsStorage: SettingsStorage,
    private readonly settingsStore: SettingsStore,
  ) {}

  initialize(): void {
    const storedSettings = this.settingsStorage.getSettings();

    if (storedSettings) {
      this.settingsStore.setSettings(storedSettings);
    } else {
      this.setLanguage('en');
    }

    this.setTranslateLanguage(storedSettings?.language ?? 'en')
  }

  setLanguage(language: string): void {
    const updatedSettings: AppSettings = {
      language,
    };

    this.settingsStore.setSettings(updatedSettings);

    this.settingsStorage.setSettings(updatedSettings);

    this.setTranslateLanguage(language);
  }

  get currentLanguage() {
    return this.settingsStore.language;
  }

  setTranslateLanguage(language: string) {
    this.translateService.use(language);
  }
}
