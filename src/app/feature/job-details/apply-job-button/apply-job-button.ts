import { Component, computed, input, signal } from '@angular/core';
import { JobActivityStore } from '../../../core/job-activity/job-activity-store';
import { JobActivityService } from '../../../core/job-activity/job-activity-service';
import { FormsModule } from '@angular/forms';
import { JobApplicationService } from '../../../core/job-applications/job-application-service';
import {
  NoticePeriodType,
} from '../../../core/job-applications/job-application.model';
import { AuthStore } from '../../../core/auth/auth-store';

@Component({
  selector: 'app-apply-job-button',
  imports: [FormsModule],
  templateUrl: './apply-job-button.html',
  styleUrl: './apply-job-button.css',
})
export class ApplyJobButton {
  jobId = input.required<number>();

  constructor(
    private readonly activityStore: JobActivityStore,
    private readonly jobActivityService: JobActivityService,
    private readonly jobApplicationService: JobApplicationService,
    private readonly authStore: AuthStore,
  ) {}

  isModalOpen = signal(false);

  totalExperience = signal('');
  relevantExperience = signal('');
  currentLocation = signal('');
  noticePeriod = signal<NoticePeriodType>('30');

  isApplied = computed(() => this.activityStore.appliedJobs().includes(this.jobId()));

  openModal(): void {
    if (this.isApplied()) return;
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  apply(): void {
    const userId = this.authStore.userId();

    if (!userId) {
      console.warn('User not authenticated');
      return;
    }

    this.jobApplicationService.applyJob({
      applicantId: userId,
      jobId: this.jobId(),

      totalExperience: this.totalExperience(),
      relevantExperience: this.relevantExperience(),
      currentLocation: this.currentLocation(),
      noticePeriod: this.noticePeriod(),
    });

    this.jobActivityService.applyJob(this.jobId());

    this.closeModal();

    this.resetForm();

    console.log('Job application submitted successfully');
  }

  private resetForm(): void {
    this.totalExperience.set('');
    this.relevantExperience.set('');
    this.currentLocation.set('');
    this.noticePeriod.set('30');
  }
}
