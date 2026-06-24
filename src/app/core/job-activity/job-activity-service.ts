import { Injectable } from '@angular/core';
import { JobActivityStorage } from './job-activity-storage';
import { JobActivityStore } from './job-activity-store';
import { JobActivity } from './job-activity.model';

@Injectable({
  providedIn: 'root',
})
export class JobActivityService {
  constructor(
    private storage: JobActivityStorage,
    private store: JobActivityStore,
  ) {}

  createJobActivity(userId: string): void {
    const jobActivity = this.getJobActivityById(userId);

    if (jobActivity) return;

    const activity: JobActivity = {
      userId,
      appliedJobs: [],
      savedJobs: [],
    };

    this.storage.saveAll([activity])
  }

  toggleSaveJob(jobId: number) {
    const current = this.store.currentActivity();

    if (!current) return;

    const exists = current.savedJobs.includes(jobId);

    const updated: JobActivity = {
      ...current,
      savedJobs: exists
        ? current.savedJobs.filter((id) => id !== jobId)
        : [...current.savedJobs, jobId],
    };

    this.update(updated);
  }

  applyJob(jobId: number) {
    const current = this.store.currentActivity();

    if (!current) return;

    if (current.appliedJobs.includes(jobId)) return;

    const updated: JobActivity = {
      ...current,
      appliedJobs: [...current.appliedJobs, jobId],
    };

    this.update(updated);
  }

  // PRIVATE sync helper
  private update(activity: JobActivity) {
    const all = this.storage.getAll();

    const updated = all.map((a) => (a.userId === activity.userId ? activity : a));

    this.storage.saveAll(updated);
    this.store.setActivity(activity);
  }

  private getJobActivityById(userId: string) {
    const allUser = this.storage.getAll();
    return allUser.find((user) => user.userId === userId);
  }
}
