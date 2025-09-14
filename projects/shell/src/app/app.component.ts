import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';

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

  constructor(private router: Router) {
    // Don't show welcome screen since we redirect to agenda
    this.showWelcome = false;
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
