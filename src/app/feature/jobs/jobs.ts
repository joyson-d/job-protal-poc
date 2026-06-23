import { Component, OnInit, signal } from '@angular/core';
import { JobsApiService } from '../../core/api/jobs-api.service';
import { Job } from './jobs.model';
import { JobCard } from './job-card/job-card';
import { JobsStoreService } from '../../core/store/jobs-store';

@Component({
  selector: 'app-jobs',
  imports: [JobCard],
  templateUrl: './jobs.html',
  styleUrl: './jobs.css',
  standalone: true,
})
export class Jobs implements OnInit {

  jobs = signal<Job[]>([]);
   

  constructor(
    private jobFetchApi: JobsApiService,
    private jobsStore: JobsStoreService,
  ) {}




  ngOnInit(): void {
    this.getApiJobs();
    this.jobs = this.jobsStore.jobs
  }

  getApiJobs() {
    this.jobFetchApi
      .getJobs()
      .subscribe((jobs) => this.jobsStore.setJobs(jobs));
  }
}
