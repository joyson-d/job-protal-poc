import { Injectable } from '@angular/core';
import { JobApplicationStorage } from './job-application-storage';
import { JobApplicationType } from './job-application.model';

@Injectable({
  providedIn: 'root',
})
export class JobApplicationService {
  constructor(private readonly storage: JobApplicationStorage) {}

  applyJob(application: Omit<JobApplicationType, 'id' | 'appliedAt'>): void {
    const applications = this.storage.getItems();

    const newApplication = {
      ...application,

      // generated here (service responsibility)
      id: crypto.randomUUID(),

      appliedAt: new Date().toISOString(),
    };

    applications.push(newApplication);

    this.storage.setItems(applications);

    console.log('Application stored:', newApplication);
  }
}
