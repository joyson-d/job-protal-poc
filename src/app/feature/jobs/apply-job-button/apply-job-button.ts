import { Component, computed, input } from '@angular/core';
import { JobActivityStore } from '../../../core/job-activity/job-activity-store';
import { JobActivityService } from '../../../core/job-activity/job-activity-service';

@Component({
  selector: 'app-apply-job-button',
  imports: [],
  templateUrl: './apply-job-button.html',
  styleUrl: './apply-job-button.css',
})
export class ApplyJobButton {

  jobId = input.required<number>();

  constructor(
    private activityStore: JobActivityStore,
    private jobActivityService: JobActivityService,
  ) {}

   isApplied = computed(() =>
    this.activityStore.appliedJobs().includes(this.jobId())
  );

  apply() {
    this.jobActivityService.applyJob(this.jobId());
  }
}
