import { Component, computed } from '@angular/core';
import { JobActivityStore } from '../../core/job-activity/job-activity-store';
import { JobActivityService } from '../../core/job-activity/job-activity-service';
import { JobCard } from '../../shared/components/job-card/job-card';

@Component({
  selector: 'app-saved-jobs',
  imports: [JobCard],
  templateUrl: './saved-jobs.html',
  styleUrl: './saved-jobs.css',
})
export class SavedJobs {

  constructor(private jobActivityService:JobActivityService){

  }

  savedJobs=computed(()=> this.jobActivityService.getSavedJobsList)
}
