import { Component, computed, input } from '@angular/core';
import { JobActivityStore } from '../../../core/job-activity/job-activity-store';
import { JobActivityService } from '../../../core/job-activity/job-activity-service';

@Component({
  selector: 'app-saved-job-button',
  imports: [],
  templateUrl: './saved-job-button.html',
  styleUrl: './saved-job-button.css',
})
export class SavedJobButton {
  jobId = input.required<number>();

  constructor(
    private activityStore: JobActivityStore,
    private jobActivityService: JobActivityService,
  ) {}

  isSaved = computed(() => this.activityStore.savedJobs().includes(this.jobId()));

  toggleSave() {
    this.jobActivityService.toggleSaveJob(this.jobId());
  }
}
