import { Routes } from '@angular/router';
import { Jobs } from './feature/jobs/jobs';
import { Login } from './feature/auth/pages/login/login';
import { Register } from './feature/auth/pages/register/register';
import { Profile } from './feature/profile/profile/profile';
import { JobDetails } from './feature/jobs/job-details/job-details';

export const routes: Routes = [
    {
        path:"",
        component:Jobs
    },
    {
        path:"login",
        component:Login
    },
    {
        path:"register",
        component:Register
    },
    {
        path:'profile',
        component:Profile
    },
    {
        path:"jobs/:id",
        component:JobDetails
    }
];
