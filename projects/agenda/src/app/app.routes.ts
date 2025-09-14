import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'agenda',
        loadChildren: () => import('./agenda/agenda.module').then(m => m.AgendaModule)
    },
    {
        path: '',
        redirectTo: 'agenda',
        pathMatch: 'full'
    }
];