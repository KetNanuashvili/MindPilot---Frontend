import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { I18nService } from '../i18n/i18n';
import { LangSwitch } from './lang-switch';

@Component({
  selector: 'app-shell',
  imports: [NgTemplateOutlet, RouterOutlet, RouterLink, RouterLinkActive, LangSwitch],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  private readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;

  protected readonly links = computed(() => {
    const t = this.t();
    return [
      { path: '/', label: t.navToday, exact: true, icon: 'sun' },
      { path: '/plans', label: t.navPlans, exact: false, icon: 'plan' },
      { path: '/stats', label: t.navStats, exact: false, icon: 'chart' },
      { path: '/ai', label: t.navAi, exact: false, icon: 'spark' },
    ] as const;
  });
}
