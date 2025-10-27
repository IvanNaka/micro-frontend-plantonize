import { Routes, Router } from '@angular/router';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center space-x-8">
              <div class="flex items-center">
                <h1 class="text-xl font-bold text-gray-900">
                  🏥 Plantonize
                </h1>
                <span class="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  v1.0
                </span>
              </div>
              
              <!-- Navigation -->
              <nav class="hidden md:flex space-x-1">
                <button 
                  (click)="navigateToHome()"
                  class="nav-link nav-link-active border flex items-center space-x-2">
                  <span>🏠</span>
                  <span>Home</span>
                </button>
                <button 
                  (click)="navigateToModule('agenda')"
                  class="nav-link nav-link-inactive flex items-center space-x-2">
                  <span>📅</span>
                  <span>Agenda</span>
                </button>
                <button 
                  (click)="navigateToModule('financeiro')"
                  class="nav-link nav-link-inactive flex items-center space-x-2">
                  <span>💰</span>
                  <span>Financeiro</span>
                </button>
                <!-- Clientes navigation removed (project not present) -->
              </nav>
            </div>
            
            <div class="flex items-center space-x-4">
              <div class="text-sm text-gray-500">
                Shell App - Porta 4200
              </div>
              <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span class="text-sm font-medium text-gray-600">👨‍⚕️</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Mobile Navigation -->
      <nav class="md:hidden bg-white border-b">
        <div class="max-w-7xl mx-auto px-4 py-2">
          <div class="flex space-x-1">
            <button 
              (click)="navigateToHome()"
              class="nav-link nav-link-active border flex-1 flex items-center justify-center space-x-2">
              <span>🏠</span>
              <span>Home</span>
            </button>
            <button 
              (click)="navigateToModule('agenda')"
              class="nav-link nav-link-inactive flex-1 flex items-center justify-center space-x-2">
              <span>📅</span>
              <span>Agenda</span>
            </button>
            <button 
              (click)="navigateToModule('financeiro')"
              class="nav-link nav-link-inactive flex-1 flex items-center justify-center space-x-2">
              <span>💰</span>
              <span>Financeiro</span>
            </button>
            <!-- Clientes navigation removed (mobile) -->
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
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
                <button (click)="navigateToModule('agenda')"
                   class="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                  Acessar Agenda
                </button>
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
                <button (click)="navigateToModule('financeiro')"
                   class="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                  Acessar Financeiro
                </button>
              </div>
            </div>

            <!-- Clientes card removed (project deleted) -->
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
      </main>

      <!-- Footer -->
      <footer class="bg-white border-t mt-auto">
        <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div class="text-center text-small text-gray-500">
            © 2024 Plantonize - Sistema de Gestão Médica
          </div>
        </div>
      </footer>
    </div>
  `
})
class HomeComponent {
  constructor(private router: Router) {}
  
  navigateToModule(module: string): void {
    this.router.navigate([`/${module}`]);
  }
  
  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}

@Component({
  selector: 'app-module-frame',
  standalone: true,
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center space-x-8">
              <div class="flex items-center">
                <h1 class="text-xl font-bold text-gray-900">
                  🏥 Plantonize
                </h1>
                <span class="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  v1.0
                </span>
              </div>
              
              <!-- Navigation -->
              <nav class="hidden md:flex space-x-1">
                <button 
                  (click)="navigateToHome()"
                  class="nav-link nav-link-inactive flex items-center space-x-2">
                  <span>🏠</span>
                  <span>Home</span>
                </button>
                <button 
                  (click)="navigateToModule('agenda')"
                  [class]="currentModule === 'agenda' ? 'nav-link nav-link-active border' : 'nav-link nav-link-inactive'"
                  class="flex items-center space-x-2">
                  <span>📅</span>
                  <span>Agenda</span>
                </button>
                <button 
                  (click)="navigateToModule('financeiro')"
                  [class]="currentModule === 'financeiro' ? 'nav-link nav-link-active border' : 'nav-link nav-link-inactive'"
                  class="flex items-center space-x-2">
                  <span>💰</span>
                  <span>Financeiro</span>
                </button>
                <!-- Clientes navigation removed (project not present) -->
              </nav>
            </div>
            
            <div class="flex items-center space-x-4">
              <div class="text-sm text-gray-500">
                Shell App - Porta 4200
              </div>
              <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span class="text-sm font-medium text-gray-600">👨‍⚕️</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Mobile Navigation -->
      <nav class="md:hidden bg-white border-b">
        <div class="max-w-7xl mx-auto px-4 py-2">
          <div class="flex space-x-1">
            <button 
              (click)="navigateToHome()"
              class="nav-link nav-link-inactive flex-1 flex items-center justify-center space-x-2">
              <span>🏠</span>
              <span>Home</span>
            </button>
            <button 
              (click)="navigateToModule('agenda')"
              [class]="currentModule === 'agenda' ? 'nav-link nav-link-active border' : 'nav-link nav-link-inactive'"
              class="flex-1 flex items-center justify-center space-x-2">
              <span>📅</span>
              <span>Agenda</span>
            </button>
            <button 
              (click)="navigateToModule('financeiro')"
              [class]="currentModule === 'financeiro' ? 'nav-link nav-link-active border' : 'nav-link nav-link-inactive'"
              class="flex-1 flex items-center justify-center space-x-2">
              <span>💰</span>
              <span>Financeiro</span>
            </button>
            <!-- Clientes navigation removed (mobile) -->
          </div>
        </div>
      </nav>

      <!-- Main Content with iframe -->
      <main class="h-full">
        <iframe 
          [src]="moduleUrl" 
          class="w-full h-full min-h-screen border-0"
          frameborder="0">
        </iframe>
      </main>
    </div>
  `
})
class ModuleFrameComponent {
  moduleUrl!: SafeResourceUrl;
  currentModule!: string;
  
  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    // Subscribe to route parameter changes
    this.route.paramMap.subscribe(params => {
      const module = params.get('module');
      this.currentModule = module || 'agenda';

      const urls: { [key: string]: string } = {
        'agenda': environment.microfrontends.agenda.url,
        'financeiro': environment.microfrontends.financeiro.url
      };

      this.moduleUrl = this.sanitizer.bypassSecurityTrustResourceUrl(urls[module!] || urls['agenda']);
    });
  }
  
  navigateToModule(module: string): void {
    this.router.navigate([`/${module}`]);
  }
  
  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: ':module',
    component: ModuleFrameComponent
  }
];
