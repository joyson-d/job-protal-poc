import { Injectable } from '@angular/core';
import { JobActivityStorage } from './job-activity-storage';
import { JobActivityStore } from './job-activity-store';
import { JobActivity } from './job-activity.model';
import { AuthStore } from '../auth/auth-store';
import { JobsStoreService } from '../Job/jobs-store';

@Injectable({
  providedIn: 'root',
})
export class JobActivityService {
  constructor(
    private storage: JobActivityStorage,
    private store: JobActivityStore,
    private jobStore: JobsStoreService,
    private authStore: AuthStore,
  ) {}

  initializeCurrentJobActivity() {
    const userID = this.authStore.currentUser()?.id;

    if (!userID) return;

    const activity = this.getJobActivityById(userID);

    this.store.setActivity(activity ?? null);
  }

  createJobActivity(userId: string): void {
    const jobActivity = this.getJobActivityById(userId);

    if (jobActivity) return;

    const activity: JobActivity = {
      userId,
      appliedJobs: [],
      savedJobs: [],
    };

    const allActivity = this.store.currentActivity();

    const newActivitiesList = allActivity ? [allActivity, activity] : [activity];

    this.storage.saveAll(newActivitiesList);
    this.store.setActivity(activity);
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

  get getSavedJobsList() {
    return this.getSavedJobs();
  }

  get getAppliedJobsList(){
    return this.getAppliedJobs()
  }

  // PRIVATE sync helper
  private update(activity: JobActivity) {
    const all = this.storage.getAll();

    const updated = all?.map((a) => (a.userId === activity.userId ? activity : a)) ?? [] 
   
    this.storage.saveAll(updated);
    this.store.setActivity(activity);
  }

  private getJobActivityById(userId: string) {
    const allActivities = this.storage.getAll();

    if (!allActivities) return null;

    return allActivities.find((activity) => activity.userId === userId);
  }

  private getSavedJobs() {
    const jobs = this.jobStore.jobs();

    const savedSet = new Set(this.store.savedJobs());

    return jobs.filter((job) => savedSet.has(job.id));
  }

  private getAppliedJobs(){
    const jobs = this.jobStore.jobs();

    const appliedJobSet = new Set(this.store.appliedJobs());

    return jobs.filter(
      (job) => appliedJobSet.has(job.id)
    )
  }
}
