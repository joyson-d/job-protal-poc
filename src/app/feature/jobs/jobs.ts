import { Component, OnInit, signal } from '@angular/core';
import { JobsApiService } from '../../core/api/jobs-api.service';
import { Job } from '../../core/Job/jobs.model';
import { JobCard } from './job-card/job-card';
import { JobsStoreService } from '../../core/Job/jobs-store';
import { JobService } from '../../core/Job/job-service';

@Component({
  selector: 'app-jobs',
  imports: [JobCard],
  templateUrl: './jobs.html',
  styleUrl: './jobs.css',
  standalone: true,
})
export class Jobs implements OnInit {
  jobs = signal<Job[]>([]);

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobs = this.jobService.jobList;
  }
}
