import { inject, Injectable } from '@angular/core';
import { Job } from '../Job/jobs.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { API } from '../constant';

interface JobResponse {
  jobs: Job[];
}

@Injectable({
  providedIn: 'root',
})
export class JobsApiService {
  private http = inject(HttpClient);

  private readonly API_URL = API;

  getJobs() {
    return this.http.get<JobResponse>(this.API_URL).pipe(map((res) => res.jobs));
  }
}
