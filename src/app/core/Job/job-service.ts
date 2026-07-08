import { inject, Injectable, signal } from '@angular/core';
import { JobsApiService } from '../api/jobs-api.service';
import { JobsStoreService } from './jobs-store';
import { Job } from './jobs.model';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  jobs = signal<Job[]>([]);

  constructor(
    private jobFetchApi: JobsApiService,
    private jobsStore: JobsStoreService,
  ) {}

  readonly loading = signal<boolean>(true);

  fetchJobs() {
    this.loading.set(true);

    this.jobFetchApi.getJobs().subscribe({
      next: (jobs) => {
        this.jobsStore.setJobs(jobs);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load jobs', error);
        this.loading.set(false);
      },
    });
  }

  get jobList() {
    return this.jobsStore.jobs;
  }

  get isLoading() {
    return this.loading;
  }

  getJobById(id: number) {
    return this.jobsStore.getJobById(id);
  }
}
