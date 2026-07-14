import { Component, signal } from '@angular/core';

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
  readonly isOpen = signal(false);

  // Temporary hardcoded languages
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

  // Currently selected language
  selectedLanguage = this.languages[0];

  toggle(): void {
    this.isOpen.update((open) => !open);
  }

  selectLanguage(language: Language): void {
    this.selectedLanguage = language;
    this.isOpen.set(false);

    console.log('Selected Language:', language);
  }
}
