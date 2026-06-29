import { Profile } from '../profile/profile.model';

const userRoles = ['job_seeker', 'recruiter', 'admin'] as const;
const USER_STATUS = ['active', 'blocked', 'deleted'] as const;

export type UserRole = (typeof userRoles)[number];
export type UserStatus = (typeof USER_STATUS)[number];

export interface AuthSession {
  userId: string;
  role: UserRole;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  contactNumber: string;
  role: UserRole;
  profile: Profile;
  status: UserStatus;
}
