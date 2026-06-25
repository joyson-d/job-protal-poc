import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth-service';
import { AuthStorage } from '../auth/auth-storage';
import { User } from '../auth/auth.model';
import { AuthStore } from '../auth/auth-store';
import { AuthUserService } from '../auth/auth-user-service';
import { Education, Experience } from './profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private authUserService: AuthUserService,
    private authStore: AuthStore,
  ) {}

  get getCurrentUser() {
    return this.authStore.getCurrentUser;
  }

  updateUser(updatedUser: User) {
    const users = this.authUserService.getUsers();

    const updatedUsers = users.map((user) => (user.id === updatedUser.id ? updatedUser : user));

    this.authUserService.saveAllUsers(updatedUsers);
    this.authUserService.refreshUser(updatedUser);
  }

  updateSkills(skills: string[]) {
    const currentUser = this.getCurrentUser();

    if (!currentUser) {
      return;
    }

    const updatedUser: User = {
      ...currentUser,
      profile: {
        ...currentUser.profile,
        skills,
      },
    };
    this.updateUser(updatedUser);
  }

  updateEducation(education: Education) {
    const user = this.getCurrentUser();

    if (!user) return;

    const existing = user.profile.education;

    const isEdit = existing.some((e) => e.id === education.id);

    const updatedEducation = isEdit
      ? existing.map((e) => (e.id === education.id ? education : e))
      : [...existing, education];

    const updatedUser = {
      ...user,
      profile: {
        ...user.profile,
        education: updatedEducation,
      },
    };

    this.updateUser(updatedUser);
  }

  deleteEducation(id: string) {
    const user = this.getCurrentUser();

    if (!user) return;

    const updatedUser = {
      ...user,
      profile: {
        ...user.profile,
        education: user.profile.education.filter((education) => education.id !== id),
      },
    };

    this.updateUser(updatedUser);
  }

  updateExperience(experience: Experience) {
    const user = this.getCurrentUser();
    if (!user) return;

    const existing = user.profile.experience;

    const isEdit = existing.some((e) => e.id === experience.id);

    const updatedExperience = isEdit
      ? existing.map((e) => (e.id === experience.id ? experience : e))
      : [...existing, experience];

    const updatedUser: User = {
      ...user,
      profile: {
        ...user.profile,
        experience: updatedExperience,
      },
    };

    this.updateUser(updatedUser);
  }

  deleteExperience(id: string) {
    const user = this.getCurrentUser();
    if (!user) return;

    const updatedUser: User = {
      ...user,
      profile: {
        ...user.profile,
        experience: user.profile.experience.filter((exp) => exp.id !== id),
      },
    };

    this.updateUser(updatedUser);
  }
}
