import { Injectable } from '@angular/core';
import { AuthStorage } from './auth-storage';
import { AuthStore } from './auth-store';
import { User } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  constructor(
    private authStorage: AuthStorage,
    private authStore: AuthStore,
  ) {}

  initializeUser() {}

  getUsers() {
    return this.authStorage.getUsers;
  }

  userExists(users: User[], email: string): boolean {
    return users.some((user) => user.email === email);
  }

  findUserByCredentials(email: string, password: string): User | undefined {
    return this.getUsers().find((u) => u.email === email && u.password === password);
  }

  saveAllUsers(updatedUsers: User[]){
    this.authStorage.saveAllUsers(updatedUsers)
  }

  refreshUser(user:User){
    this.authStore.refreshCurrentUser(user)
  }
}
