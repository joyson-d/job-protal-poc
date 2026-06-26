import { Routes } from '@angular/router';
import { Jobs } from './feature/jobs/jobs';
import { Login } from './feature/auth/pages/login/login';
import { Register } from './feature/auth/pages/register/register';
import { Profile } from './feature/profile/profile';
import { JobDetails } from './feature/job-details/job-details';
import { SavedJobs } from './feature/saved-jobs/saved-jobs';
import { authGuard } from './core/auth/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: Jobs,
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
