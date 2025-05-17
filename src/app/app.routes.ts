import { Routes } from '@angular/router';
import { MainComponent } from './features/dashboard/main/main.component';
import { CompanyComponent } from './features/about/company/company.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        component: MainComponent,
        path: 'dashboard'
    },
    {
        component: CompanyComponent,
        path: 'company'
    },
     {
        loadComponent: () => import('./features/about/team/team.component').then((component) => component.TeamComponent),
        path: "team"
    }
];
