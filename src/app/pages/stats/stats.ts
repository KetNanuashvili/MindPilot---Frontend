import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../i18n/i18n';

type Range = 'week' | 'month';

@Component({
  selector: 'app-stats',
  imports: [RouterLink],
  templateUrl: './stats.html',
  styleUrl: './stats.scss',
})
export class StatsPage {
  protected readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
  protected readonly range = signal<Range>('week');

  protected readonly week = {
    percent: 72,
    done: 18,
    total: 25,
    spent: 146,
    plannedSpend: 180,
    energy: [6, 7, 5, 8, 7, 6, 7],
  };

  protected readonly month = {
    percent: 64,
    done: 58,
    total: 90,
    spent: 612,
    plannedSpend: 700,
    energy: [6, 5, 7, 6, 8, 7, 6],
  };

  protected current() {
    return this.range() === 'week' ? this.week : this.month;
  }

  protected insights() {
    const t = this.t();
    return this.range() === 'week'
      ? { worked: t.weekWorked, missed: t.weekMissed }
      : { worked: t.monthWorked, missed: t.monthMissed };
  }
}
