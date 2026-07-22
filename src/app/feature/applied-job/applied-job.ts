import { Component, computed, inject } from '@angular/core';
import { JobActivityService } from '../../core/job-activity/job-activity-service';
import { JobCard } from '../../shared/components/job-card/job-card';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-applied-job',
  imports: [JobCard,TranslatePipe],
  templateUrl: './applied-job.html',
  styleUrl: './applied-job.css',
})
export class AppliedJob {
  jobActivityService = inject(JobActivityService);

  appliedJob = computed(() => this.jobActivityService.getAppliedJobsList);
}
