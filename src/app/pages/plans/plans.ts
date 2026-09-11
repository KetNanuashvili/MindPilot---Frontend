import { Component, inject, signal } from '@angular/core';
import { I18nService } from '../../i18n/i18n';

type Period = 'day' | 'week' | 'month';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.html',
  styleUrl: './plans.scss',
})
export class PlansPage {
  protected readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
  protected readonly period = signal<Period>('week');
  protected readonly monthDays = this.buildMonth();

  protected readonly periods: { id: Period; labelKey: 'day' | 'week' | 'month' }[] = [
    { id: 'day', labelKey: 'day' },
    { id: 'week', labelKey: 'week' },
    { id: 'month', labelKey: 'month' },
  ];

  protected setPeriod(period: Period): void {
    this.period.set(period);
  }

  protected loadLabel(load: string): string {
    const t = this.t();
    if (load === 'light') {
      return t.loadLight;
    }
    if (load === 'full') {
      return t.loadFull;
    }
    return t.loadBalanced;
  }

  private buildMonth(): { date: number | null; planned: boolean; today: boolean }[] {
    const firstWeekday = 1;
    const daysInMonth = 30;
    const today = 12;
    const planned = new Set([2, 5, 8, 9, 11, 12, 16, 18, 22, 25, 29]);
    const cells: { date: number | null; planned: boolean; today: boolean }[] = [];

    for (let i = 0; i < firstWeekday; i += 1) {
      cells.push({ date: null, planned: false, today: false });
    }

    for (let date = 1; date <= daysInMonth; date += 1) {
      cells.push({
        date,
        planned: planned.has(date),
        today: date === today,
      });
    }

    return cells;
  }
}
