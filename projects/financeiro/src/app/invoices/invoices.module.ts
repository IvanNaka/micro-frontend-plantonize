import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { InvoicesComponent } from './invoices.component';
import { InvoicesService } from './invoices.service';

const routes: Routes = [
  {
    path: '',
    component: InvoicesComponent
  }
];

@NgModule({
  declarations: [
    InvoicesComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    InvoicesService
  ]
})
export class InvoicesModule { }
