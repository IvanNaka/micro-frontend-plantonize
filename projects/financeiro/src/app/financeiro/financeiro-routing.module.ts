import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinanceiroComponent } from './financeiro.component';

const routes: Routes = [
  {
    path: '',
    component: FinanceiroComponent,
    children: [
      {
        path: 'invoices',
        loadChildren: () => import('../invoices/invoices.module').then(m => m.InvoicesModule)
      },
      {
        path: '',
        redirectTo: 'invoices',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanceiroRoutingModule {}