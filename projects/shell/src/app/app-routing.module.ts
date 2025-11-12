import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from '../environments/environment';

const routes: Routes = [
  { path: '', redirectTo: 'agenda', pathMatch: 'full' },
  {
    path: 'agenda',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: `${environment.microfrontends.agenda.url}remoteEntry.js`,
        exposedModule: './Module',
      }).then((m) => m.AgendaModule), // O nome do módulo exportado
  },
  {
    path: 'financeiro',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: `${environment.microfrontends.financeiro.url}remoteEntry.js`,
        exposedModule: './Module',
      }).then((m) => m.FinanceiroModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}