import { computed, Injectable, signal } from '@angular/core';
import { AuthSession, User } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private readonly sessionSignal = signal<AuthSession | null>(null);

  private readonly currentUserSignal = signal<User | null>(null);

  readonly session = this.sessionSignal.asReadonly();
  readonly currentUser = this.currentUserSignal.asReadonly();

  readonly userId = computed(() => this.sessionSignal()?.userId ?? null);

  readonly role = computed(() => this.sessionSignal()?.role ?? null);

  readonly isAuthenticated = computed(() => this.sessionSignal() !== null);

  authenticate(authCredentials: AuthSession) {
    this.sessionSignal.set(authCredentials);
  }

  logout() {
    this.sessionSignal.set(null);
  }

  initialize(session: AuthSession | null, user: User | null) {
    this.sessionSignal.set(session);
    this.refreshCurrentUser(user);
  }

  getSession() {
    return this.sessionSignal();
  }

  get getCurrentUser() {
    return this.currentUserSignal;
  }

  refreshCurrentUser(user: User | null) {
    this.currentUserSignal.set(user);
  }
}
