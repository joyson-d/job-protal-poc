import { Injectable } from '@angular/core';
import { AuthSession, User } from './auth.model';
import {CURRENT_USER_STORAGE_KEY,USERS_STORAGE_KEY } from "../constant";

@Injectable({
  providedIn: 'root',
})
export class AuthStorage {
  
  get getCurrentUser(): AuthSession | null {
    const data = localStorage.getItem(CURRENT_USER_STORAGE_KEY);

    return data ? JSON.parse(data) : null;
  }

  get getUsers(): User[] {
    const data = localStorage.getItem(USERS_STORAGE_KEY);

    return data ? JSON.parse(data) : [];
  }

  setCurrentUser(session: AuthSession) {
    localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(session));
  }

  removeCurrentUser() {
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
  }

  saveAllUsers(users: User[]) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }
  
}
