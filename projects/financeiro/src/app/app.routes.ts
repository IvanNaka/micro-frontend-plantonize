import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'financeiro',
        loadChildren: () => import('./financeiro/financeiro.module').then(m => m.FinanceiroModule)
    },
    {
        path: '',
        redirectTo: 'financeiro',
        pathMatch: 'full'
    }
];