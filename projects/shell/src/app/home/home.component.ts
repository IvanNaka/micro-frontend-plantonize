import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
            <a href="https://master.d38x975wk8l8lt.amplifyapp.com" target="_blank" 
               class="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Acessar Agenda
            </a>
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
            <a href="https://master.d3a2j644iqswfl.amplifyapp.com" target="_blank"
               class="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
              Acessar Financeiro
            </a>
          </div>
        </div>

        <!-- Clientes Card -->
        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div class="text-center">
            <div class="text-4xl mb-4">👥</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Clientes</h3>
            <p class="text-gray-600 mb-4">
              Gerencie seus pacientes e clientes
            </p>
            <a href="https://master.d15fxxqhaij1k9.amplifyapp.com" target="_blank"
               class="inline-block bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors">
              Acessar Clientes
            </a>
          </div>
        </div>
      </div>

      <div class="mt-8 text-center">
        <div class="bg-gray-100 rounded-lg p-4">
          <h4 class="font-semibold text-gray-900 mb-2">Arquitetura de Micro Frontends</h4>
          <p class="text-sm text-gray-600">
            Shell (4200) + Agenda MFE (4201) + Financeiro MFE (4202) + Clientes MFE (4203)
          </p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class HomeComponent {
}
