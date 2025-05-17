import { Routes } from '@angular/router';

export const AboutRoutes: Routes = [
    {
        path: 'team',
        loadComponent: () => import('./team/team.component').then(m => m.TeamComponent)
    },
    {
        path: 'company',
        loadComponent: () => import('./company/company.component').then(m => m.CompanyComponent)
    },
    {
        path: '',
        redirectTo: 'company',
        pathMatch: 'full'
    }
]
