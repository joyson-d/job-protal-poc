import { Component, OnInit } from '@angular/core';
import { JobsApiService } from "../../core/api/jobs-api.service";
import { Job } from './jobs.model';
import { JobCard } from './job-card/job-card';

@Component({
  selector: 'app-jobs',
  imports: [JobCard],
  templateUrl: './jobs.html',
  styleUrl: './jobs.css',
  standalone:true
})
export class Jobs implements OnInit {
  fetchedJobs: Job[]=[]

  constructor(private jobFetchApi:JobsApiService){}

  ngOnInit(): void {
    this.getApiJobs()
  }

  getApiJobs(){
    this.jobFetchApi.getJobs().subscribe({
      next:(jobData)=>{
        console.log(jobData);
        this.fetchedJobs=jobData
        
      }
    })
  }
}
