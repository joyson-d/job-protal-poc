import { Injectable } from '@angular/core';
import { JobApplicationType } from './job-application.model';

const STORAGE_KEY = 'jobApplications';

@Injectable({
  providedIn: 'root',
})
export class JobApplicationStorage {
  getItems(): JobApplicationType[] {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) return [];

    return JSON.parse(data);
  }

  setItems(items: JobApplicationType[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
}
