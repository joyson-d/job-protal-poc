import { Injectable } from '@angular/core';
import { JobApplicationType } from './job-application.model';
import { JOB_APPLICATION_STORAGE_KEY } from '../constant';

@Injectable({
  providedIn: 'root',
})
export class JobApplicationStorage {
  getItems(): JobApplicationType[] {
    const data = localStorage.getItem(JOB_APPLICATION_STORAGE_KEY);

    if (!data) return [];

    return JSON.parse(data);
  }

  setItems(items: JobApplicationType[]): void {
    localStorage.setItem(JOB_APPLICATION_STORAGE_KEY, JSON.stringify(items));
  }
}
