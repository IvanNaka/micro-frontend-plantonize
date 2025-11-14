import { Routes, Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { authGuard } from './core/auth.guard';
import { AuthService } from './core/auth.service';
import { CommonModule } from '@angular/common';

// Use the standalone HomeComponent from ./home/home.component.ts

@Component({
  selector: 'app-module-frame',
  standalone: true,
  imports: [CommonModule],
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
                  [disabled]="!isAuthenticated"
                  [class]="currentModule === 'agenda' ? 'nav-link nav-link-active border' : 'nav-link nav-link-inactive'"
                  [class.opacity-50]="!isAuthenticated"
                  [class.cursor-not-allowed]="!isAuthenticated"
                  class="flex items-center space-x-2"
                  [title]="!isAuthenticated ? 'Faça login para acessar' : ''">
                  <span>📅</span>
                  <span>Agenda</span>
                  <span *ngIf="!isAuthenticated" class="text-xs">🔒</span>
                </button>
                <button 
                  (click)="navigateToModule('financeiro')"
                  [disabled]="!isAuthenticated"
                  [class]="currentModule === 'financeiro' ? 'nav-link nav-link-active border' : 'nav-link nav-link-inactive'"
                  [class.opacity-50]="!isAuthenticated"
                  [class.cursor-not-allowed]="!isAuthenticated"
                  class="flex items-center space-x-2"
                  [title]="!isAuthenticated ? 'Faça login para acessar' : ''">
                  <span>💰</span>
                  <span>Financeiro</span>
                  <span *ngIf="!isAuthenticated" class="text-xs">🔒</span>
                </button>
                <!-- Clientes navigation removed (project not present) -->
              </nav>
            </div>
            
            <div class="flex items-center space-x-4">
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
              [disabled]="!isAuthenticated"
              [class]="currentModule === 'agenda' ? 'nav-link nav-link-active border' : 'nav-link nav-link-inactive'"
              [class.opacity-50]="!isAuthenticated"
              [class.cursor-not-allowed]="!isAuthenticated"
              class="flex-1 flex items-center justify-center space-x-2">
              <span>📅</span>
              <span>Agenda</span>
              <span *ngIf="!isAuthenticated">🔒</span>
            </button>
            <button 
              (click)="navigateToModule('financeiro')"
              [disabled]="!isAuthenticated"
              [class]="currentModule === 'financeiro' ? 'nav-link nav-link-active border' : 'nav-link nav-link-inactive'"
              [class.opacity-50]="!isAuthenticated"
              [class.cursor-not-allowed]="!isAuthenticated"
              class="flex-1 flex items-center justify-center space-x-2">
              <span>💰</span>
              <span>Financeiro</span>
              <span *ngIf="!isAuthenticated">🔒</span>
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
  authService = inject(AuthService);
  
  get isAuthenticated(): boolean {
    return this.authService.isLoggedIn();
  }
  
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
    if (!this.isAuthenticated) {
      alert('Você precisa estar autenticado para acessar esta página.');
      return;
    }
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
    component: ModuleFrameComponent,
    canActivate: [authGuard]
  }
];
