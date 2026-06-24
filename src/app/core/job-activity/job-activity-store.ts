import { computed, Injectable, signal } from '@angular/core';
import { JobActivity } from './job-activity.model';

@Injectable({
  providedIn: 'root',
})
export class JobActivityStore {
  private activity = signal<JobActivity | null>(null);

  readonly savedJobs = computed(() => this.activity()?.savedJobs ?? []);

  readonly appliedJobs = computed(() => this.activity()?.appliedJobs ?? []);

  readonly currentActivity = computed(() => this.activity());

  setActivity(activity: JobActivity | null) {
    this.activity.set(activity);
  }

  clear() {
    this.activity.set(null);
  }
}
