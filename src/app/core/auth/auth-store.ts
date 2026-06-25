import { computed, Injectable, signal } from '@angular/core';
import { AuthSession, User } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private session = signal<AuthSession | null>(null);

  private currentUser = signal<User | null>(null);

  userId = computed(() => this.session()?.userId ?? null);

  role = computed(() => this.session()?.role ?? null);

  isAuthenticated = computed(() => this.session() !== null);

  authenticate(authCredentials: AuthSession) {
    this.session.set(authCredentials);
  }

  logout() {
    this.session.set(null);
  }

  initialize(session: AuthSession | null, user: User | null) {
    this.session.set(session);
    this.refreshCurrentUser(user);
  }

  getSession() {
    return this.session();
  }

  get getCurrentUser() {
    return this.currentUser;
  }

  refreshCurrentUser(user: User | null) {
    this.currentUser.set(user);
  }
}
