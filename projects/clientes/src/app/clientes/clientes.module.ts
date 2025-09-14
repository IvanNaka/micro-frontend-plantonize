import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    ClientesComponent
  ]
})
export class ClientesModule { }
