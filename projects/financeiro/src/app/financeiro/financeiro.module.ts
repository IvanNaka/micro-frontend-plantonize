import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceiroRoutingModule } from './financeiro-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FinanceiroRoutingModule
  ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FinanceiroModule { }
