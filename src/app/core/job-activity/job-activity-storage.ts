import { Injectable } from '@angular/core';
import { JobActivity } from './job-activity.model';

const JOB_ACTIVITY_KEY = 'jobActivities';

@Injectable({
  providedIn: 'root',
})
export class JobActivityStorage {
  getAll(): JobActivity[] {
    const data = localStorage.getItem(JOB_ACTIVITY_KEY);

    return data ? JSON.parse(data) : [];
  }

  saveAll(activities: JobActivity[]) {
    localStorage.setItem(JOB_ACTIVITY_KEY, JSON.stringify(activities));
  }
}
