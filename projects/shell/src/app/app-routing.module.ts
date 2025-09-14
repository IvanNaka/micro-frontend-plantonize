import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

const routes: Routes = [
  { path: '', redirectTo: 'agenda', pathMatch: 'full' },
  {
    path: 'agenda',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'https://master.d38x975wk8l8lt.amplifyapp.com/remoteEntry.js',
        exposedModule: './Module',
      }).then((m) => m.AgendaModule), // O nome do módulo exportado
  },
  {
    path: 'financeiro',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'https://master.d3a2j644iqswfl.amplifyapp.com/remoteEntry.js',
        exposedModule: './Module',
      }).then((m) => m.FinanceiroModule),
  },
  {
    path: 'clientes',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'https://master.d15fxxqhaij1k9.amplifyapp.com/remoteEntry.js',
        exposedModule: './Module',
      }).then((m) => m.ClientesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}