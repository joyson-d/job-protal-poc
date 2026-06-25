import { Injectable } from '@angular/core';
import { AuthSession, User } from './auth.model';

const CURRENT_USER_KEY = 'currentUser';
const USERS_KEY = 'users';

@Injectable({
  providedIn: 'root',
})
export class AuthStorage {
  
  get getCurrentUser(): AuthSession | null {
    const data = localStorage.getItem(CURRENT_USER_KEY);

    return data ? JSON.parse(data) : null;
  }

  get getUsers(): User[] {
    const data = localStorage.getItem(USERS_KEY);

    return data ? JSON.parse(data) : [];
  }

  setCurrentUser(session: AuthSession) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(session));
  }

  removeCurrentUser() {
    localStorage.removeItem(CURRENT_USER_KEY);
  }

  saveAllUsers(users: User[]) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
  
}
