import { Injectable, OnInit, signal } from '@angular/core';
import { AuthStorage } from './auth-storage';
import { AuthStore } from './auth-store';
import { User } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private authStorage: AuthStorage,
    private authStore: AuthStore,
  ) {}

  isUserAuthenticated=signal<boolean>(false)

  initializeCurrentUser() {
    const userSession = this.authStorage.getCurrentUser;

    this.authStore.initialize(userSession);
  }

  register(user: Omit<User, 'id' | 'status' | 'profile'>) {
    const users = this.getUsers();

    const checkUserExists = this.userExists(users, user.email);

    if (checkUserExists) {
      return this.error('User already exists');
    }

    const newUser = this.createUser(user);

    this.saveNewUser(users, newUser);

    this.createSession(newUser);

    return this.success();
  }

  login(email: string, password: string) {
    const user = this.findUserByCredentials(email, password);

    if (!user) {
      return this.error('Invalid credentials');
    }

    this.createSession(user);

    return this.success();
  }

  logout() {
    this.authStorage.removeCurrentUser();
    this.authStore.logout();
  }

  get isAuthenticated(){
    return  this.authStore.isAuthenticated();
  }

  // USER QUERIES
  private getUsers(): User[] {
    return this.authStorage.getUsers;
  }

  private userExists(users: User[], email: string): boolean {
    return users.some((user) => user.email === email);
  }

  private findUserByCredentials(email: string, password: string): User | undefined {
    return this.getUsers().find((u) => u.email === email && u.password === password);
  }

  // USER CREATION
  private createUser(user: Omit<User, 'id' | 'status' | 'profile'>): User {
    return {
      ...user,
      id: crypto.randomUUID(),
      profile: {
        education: [],
        experience: [],
        skills: [],
      },
      status: 'active',
    };
  }

  private saveNewUser(users: User[], user: User) {
    users.push(user);
    this.authStorage.saveAllUsers(users);
  }

  // SESSION
  private createSession(user: User) {
    const session = {
      userId: user.id,
      role: user.role,
    };

    this.authStorage.setCurrentUser(session);
    this.authStore.authenticate(session);
  }

  // HELPERS
  private success() {
    return { success: true } as const;
  }

  private error(message: string) {
    return {
      success: false,
      message,
    } as const;
  }
}
