import { Injectable } from '@angular/core';
import { JobActivity } from './job-activity.model';
import { JOB_ACTIVITY_STORAGE_KEY } from '../constant';

@Injectable({
  providedIn: 'root',
})
export class JobActivityStorage {
  getAll(): JobActivity[] | null {
    const data = localStorage.getItem(JOB_ACTIVITY_STORAGE_KEY);

    return data ? JSON.parse(data) : null;
  }

  saveAll(activities: JobActivity[]) {
    localStorage.setItem(JOB_ACTIVITY_STORAGE_KEY, JSON.stringify(activities));
  }
}
