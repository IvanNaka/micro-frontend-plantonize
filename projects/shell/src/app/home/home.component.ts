import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/auth.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl mx-auto py-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">
          🏥 Bem-vindo ao Plantonize
        </h1>
        <p class="text-gray-600 mb-8">
          Sistema de gestão de plantões médicos com arquitetura de micro frontends
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <!-- Agenda Card -->
        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div class="text-center">
            <div class="text-4xl mb-4">📅</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Agenda</h3>
            <p class="text-gray-600 mb-4">
              Gerencie seus plantões e consultas médicas
            </p>
            <ng-container *ngIf="isAuthenticated; else agendaLocked">
              <button (click)="openAgenda()" class="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                Acessar Agenda
              </button>
            </ng-container>
            <ng-template #agendaLocked>
              <button class="inline-block bg-blue-200 text-white px-4 py-2 rounded cursor-not-allowed" disabled title="Faça login para acessar">
                Faça login para acessar
              </button>
            </ng-template>
          </div>
  </div>
  <!-- Financeiro Card -->
        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div class="text-center">
            <div class="text-4xl mb-4">💰</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Financeiro</h3>
            <p class="text-gray-600 mb-4">
              Controle suas finanças e faturamento
            </p>
            <ng-container *ngIf="isAuthenticated; else financeiroLocked">
              <button (click)="openFinanceiro()" class="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                Acessar Financeiro
              </button>
            </ng-container>
            <ng-template #financeiroLocked>
              <button class="inline-block bg-green-200 text-white px-4 py-2 rounded cursor-not-allowed" disabled title="Faça login para acessar">
                Faça login para acessar
              </button>
            </ng-template>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: []
})
export class HomeComponent {
  env = environment;

  constructor(private authService: AuthService, private router: Router) {}

  openAgenda(): void {
    this.router.navigate(['/agenda']);
  }

  openFinanceiro(): void {
    this.router.navigate(['/financeiro']);
  }

  get isAuthenticated(): boolean {
    return this.authService.isLoggedIn();
  }
}
