import { computed, effect, Injectable, signal } from '@angular/core';
import { Lang, translations } from './translations';

const STORAGE_KEY = 'mindpilot-lang';

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly lang = signal<Lang>(readLang());
  readonly t = computed(() => translations[this.lang()]);

  constructor() {
    effect(() => {
      const lang = this.lang();
      document.documentElement.lang = lang;
      localStorage.setItem(STORAGE_KEY, lang);
    });
  }

  set(lang: Lang): void {
    this.lang.set(lang);
  }
}

function readLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'ka' || saved === 'en') {
      return saved;
    }
  } catch {
    // Ignore missing storage in tests.
  }

  return 'ka';
}
