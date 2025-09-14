// projects/agenda/src/app/agenda/agenda.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaRoutingModule } from './agenda-routing.module';
import { AgendaComponent } from './agenda/agenda.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AgendaRoutingModule,
    AgendaComponent
  ]
})
export class AgendaModule { }