import { inject, Injectable } from '@angular/core';
import { Job } from '../../feature/jobs/jobs.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

interface JobResponse {
  jobs: Job[];
}

@Injectable({
    providedIn:'root'
})

export class JobsApiService {
  private http = inject(HttpClient);

  private readonly API_URL = 'https://remotive.com/api/remote-jobs';

  getJobs() {
    return this.http.get<JobResponse>(this.API_URL).pipe(map((res) => res.jobs));
  }
}
