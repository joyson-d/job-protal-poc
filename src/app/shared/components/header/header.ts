import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth-service';
import { LanguageSelector } from '../language-selector/language-selector';

@Component({
  selector: 'app-header',
  imports: [RouterLink,LanguageSelector],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}

  get currentRoute(): string {
    return this.router.url;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  onLogout() {
    this.closeMenu();
    this.logout();
  }
}
