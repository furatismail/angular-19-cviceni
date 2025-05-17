import { Routes } from '@angular/router';

export const SettingsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./overview/overview.component').then(m => m.OverviewComponent),
        children: [
            {
                path: 'panel',
                loadComponent: () => import('./panel/panel.component').then(m => m.PanelComponent)
            },
            {
                path: 'statistics',
                loadComponent: () => import('./statistics/statistics.component').then(m => m.StatisticsComponent)
            }
        ]
    }

]
