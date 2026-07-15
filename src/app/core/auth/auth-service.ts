import { Injectable, OnInit, signal } from '@angular/core';
import { AuthStorage } from './auth-storage';
import { AuthStore } from './auth-store';
import { User } from './auth.model';
import { JobActivityService } from '../job-activity/job-activity-service';
import { AuthUserService } from './auth-user-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private authStorage: AuthStorage,
    private authStore: AuthStore,
    private jobActivityService: JobActivityService,
    private authUserService: AuthUserService,
  ) {}


  initializeCurrentUser() {
    const userSession = this.authStorage.getCurrentUser;

    if (!userSession) return;

    const currentUser = this.getCurrentUserById(userSession.userId);

    this.authStore.initialize(userSession, currentUser);

    return true
  }

  register(user: Omit<User, 'id' | 'status' | 'profile'>) {
    const users = this.authUserService.getUsers();

    const checkUserExists = this.authUserService.userExists(users, user.email);

    if (checkUserExists) {
      return this.error('User already exists');
    }

    const newUser = this.createUser(user);

    this.saveNewUser(users, newUser);

    this.jobActivityService.createJobActivity(newUser.id);

    this.createSession(newUser);

    return this.success();
  }

  login(email: string, password: string) {
    const user = this.authUserService.findUserByCredentials(email, password);

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

  get isAuthenticated() {
    return this.authStore.isAuthenticated();
  }

  getCurrentUserById(userId: string) {
    const users = this.authUserService.getUsers();

    return users.find((user) => user.id === userId) ?? null;
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
