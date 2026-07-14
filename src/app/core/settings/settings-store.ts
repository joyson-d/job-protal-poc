import { Injectable, signal } from '@angular/core';
import { AppSettings } from './settings.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsStore {
  private readonly settingsState = signal<AppSettings>({
    language: 'en',
  });

  readonly settings = this.settingsState.asReadonly();

  setSettings(settings: AppSettings): void {
    this.settingsState.set(settings);
  }

  updateSettings(update: Partial<AppSettings>): void {
    this.settingsState.update((current) => ({
      ...current,
      ...update,
    }));
  }

  get language(): string {
    return this.settingsState().language;
  }
}
