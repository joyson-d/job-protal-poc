import { Routes } from '@angular/router';
import { Profile } from './feature/profile/profile';
import { JobDetails } from './feature/job-details/job-details';
import { SavedJobs } from './feature/saved-jobs/saved-jobs';
import { authGuard, guestGuard } from './core/auth/auth-guard';
import { Login } from './feature/auth/login/login';
import { Register } from './feature/auth/register/register';
import { AppliedJob } from './feature/applied-job/applied-job';
import { InterviewQuestion } from './feature/interview-question/interview-question';

export const routes: Routes = [
  {
    path: '',
    loadComponent:()=> import('./feature/jobs/jobs').then((m) => m.Jobs)
  },
  {
    path: 'login',
    component: Login,
    canActivate:[guestGuard]
  },
  {
    path: 'register',
    component: Register,
    canActivate:[guestGuard]
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
  {
    path: 'applied-jobs',
    component: AppliedJob,
    canActivate: [authGuard],
  },
  {
    path: 'interview-question',
    component: InterviewQuestion,
    canActivate: [authGuard],
  },
];
