import { Component, inject, signal } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings-service';
import { SettingsStore } from '../../../core/settings/settings-store';

interface Language {
  code: string;
  name: string;
  flag: string;
}

@Component({
  selector: 'app-language-selector',
  imports: [],
  templateUrl: './language-selector.html',
  styleUrl: './language-selector.css',
})
export class LanguageSelector {
  private readonly settingsService = inject(SettingsService);
  private readonly settingStore = inject(SettingsStore);

  readonly isOpen = signal(false);

  readonly languages: Language[] = [
    {
      code: 'en',
      name: 'English',
      flag: '🇺🇸',
    },
    {
      code: 'es',
      name: 'Spanish',
      flag: '🇪🇸',
    },
    {
      code: 'fr',
      name: 'French',
      flag: '🇫🇷',
    },
  ];

  get selectedLanguage(): Language {
    
    const result =
      this.languages.find((lang) => lang.code === this.settingsService.currentLanguage) ??
      this.languages[0];

    return result;
  }

  toggle(): void {
    this.isOpen.update((open) => !open);
  }

  selectLanguage(language: Language): void {
    this.settingsService.setLanguage(language.code);

    this.isOpen.set(false);
  }
}
