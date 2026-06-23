import { computed, Injectable, signal } from '@angular/core';
import { AuthSession } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private session = signal<AuthSession | null>(null);

  userId = computed(() => this.session()?.userId ?? null);

  role = computed(() => this.session()?.role ?? null);

  isAuthenticated = computed(() => this.session() !== null);

  authenticate(authCredentials: AuthSession) {
    this.session.set(authCredentials);
  }

  logout() {
    this.session.set(null);
  }

  initialize(session: AuthSession | null) {
    this.session.set(session);
  }

  getSession() {
    return this.session();
  }
}
