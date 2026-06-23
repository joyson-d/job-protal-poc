import { Component, OnInit } from '@angular/core';
import { Job } from '../jobs.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JobsStoreService } from '../../../core/store/jobs-store';
import { getImageUrl } from '../../../shared/utils/getImageUrl';

@Component({
  selector: 'app-job-details',
  imports: [RouterLink],
  templateUrl: './job-details.html',
  styleUrl: './job-details.css',
})
export class JobDetails implements OnInit {
  job?: Job;

   getImageUrl = getImageUrl;

  constructor(
    private route: ActivatedRoute,
    private jobsStoreService: JobsStoreService,
  ) {}

  ngOnInit(): void {
    const jobId = Number(this.route.snapshot.paramMap.get('id'));

    this.job = this.jobsStoreService.getJobById(jobId);
  }

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;

    img.src = 'https://dummyimage.com/100x100/eeeeee/aaaaaa&text=Logo';
  }
}
