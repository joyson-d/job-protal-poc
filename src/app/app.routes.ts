import { Routes } from '@angular/router';
import { Profile } from './feature/profile/profile';
import { JobDetails } from './feature/job-details/job-details';
import { SavedJobs } from './feature/saved-jobs/saved-jobs';
import { authGuard } from './core/auth/auth-guard';
import { Login } from './feature/auth/login/login';
import { Register } from './feature/auth/register/register';

export const routes: Routes = [
  {
    path: '',
    loadComponent:()=> import('./feature/jobs/jobs').then((m) => m.Jobs)
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'profile',
    component: Profile,
    canActivate: [authGuard],
  },
  {
    path: 'jobs/:id',
    component: JobDetails,
  },
  {
    path: 'saved-jobs',
    component: SavedJobs,
    canActivate: [authGuard],
  },
];
