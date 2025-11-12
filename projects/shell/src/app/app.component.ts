import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'shell';
  isLoading = false;
  showWelcome = true;

  constructor(private router: Router, private auth: AuthService) {
    // Don't show welcome screen since we redirect to agenda
    this.showWelcome = false;
  }

  get isAuthenticated(): boolean {
    return this.auth.isLoggedIn();
  }

  get userName(): string | null {
    return this.auth.getAccountName();
  }

  login(): void {
    // Trigger redirect-based login. Do not await because this will navigate away.
    this.isLoading = true;
    console.debug('AppComponent: login() called, invoking AuthService.login()');
    this.auth.login();
  }

  logout(): void {
    // Trigger redirect-based logout. Do not await because this will navigate away.
    this.isLoading = true;
    this.auth.logout();
  }

  navigateToModule(module: string): void {
    this.isLoading = true;
    this.showWelcome = false;
    
    this.router.navigate([`/${module}`]).then(() => {
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    });
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  isActiveRoute(route: string): boolean {
    if (route === '/home') {
      return this.router.url === '/' || this.router.url === '/home';
    }
    return this.router.url.startsWith(route);
  }

  onRouteActivate(): void {
    this.isLoading = false;
    this.showWelcome = false;
  }

  onRouteDeactivate(): void {
    // Keep welcome screen hidden since we always redirect
    this.showWelcome = false;
  }
}
