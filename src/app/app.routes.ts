import { Routes } from '@angular/router';
import { Shell } from './layout/shell';
import { TodayPage } from './pages/today/today';
import { PlansPage } from './pages/plans/plans';
import { StatsPage } from './pages/stats/stats';
import { AssistantPage } from './pages/assistant/assistant';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      { path: '', component: TodayPage },
      { path: 'plans', component: PlansPage },
      { path: 'stats', component: StatsPage },
      { path: 'ai', component: AssistantPage },
    ],
  },
];
