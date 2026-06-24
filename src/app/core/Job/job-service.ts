import { inject, Injectable, signal } from '@angular/core';
import { JobsApiService } from '../api/jobs-api.service';
import { JobsStoreService } from './jobs-store';
import { HttpClient } from '@angular/common/http';
import { Job, JobResponse } from './jobs.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  jobs = signal<Job[]>([]);

  constructor(
    private jobFetchApi: JobsApiService,
    private jobsStore: JobsStoreService,
  ) {}

  onLoadFetchJob() {
    this.jobFetchApi.getJobs().subscribe({
      next: (jobs) => {
        this.jobsStore.setJobs(jobs);
      },
      error: (error) => {
        console.error('Failed to load jobs', error);
      },
    });
  }

  get jobList() {
    return this.jobsStore.jobs;
  }

  getJobById(id: number) {
    return this.jobsStore.getJobById(id);
  }
}
