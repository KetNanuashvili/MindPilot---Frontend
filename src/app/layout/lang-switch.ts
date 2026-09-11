import { Component, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n';

@Component({
  selector: 'app-lang-switch',
  templateUrl: './lang-switch.html',
  styleUrl: './lang-switch.scss',
})
export class LangSwitch {
  protected readonly i18n = inject(I18nService);
}
