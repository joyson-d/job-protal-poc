import { Injectable, signal } from '@angular/core';
import { Job } from './jobs.model';

@Injectable({
  providedIn: 'root',
})
export class JobsStoreService {
  jobs = signal<Job[]>([]);

  setJobs(jobs: Job[]) {
    this.jobs.set(jobs);
  }

  getJobById(id: number) {
    return this.jobs().find((job) => job.id === id);
  }

  clearJobs() {
    this.jobs.set([]);
  }
}
