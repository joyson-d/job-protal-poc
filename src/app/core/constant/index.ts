import { environment } from '../../../environments/environment';

export const API = environment.apiUrl;
export const CURRENT_USER_STORAGE_KEY = environment.CURRENT_USER_KEY;
export const USERS_STORAGE_KEY = environment.USERS_KEY;
export const JOB_ACTIVITY_STORAGE_KEY = 'jobActivities';
export const JOB_APPLICATION_STORAGE_KEY = 'jobApplications';
export const SETTINGS_STORAGE_KEY = environment.SETTINGS_STORAGE_KEY


export const DEFAULT_MIN_SALARY_FILTER = 0
export const DEFAULT_MAX_SALARY_FILTER = 50000
