import { Component, Input } from '@angular/core';
import { Job } from '../jobs.model';
import { getImageUrl } from '../../../shared/utils/getImageUrl';
import { formatSalary } from '../../../shared/utils/formatSalary';

@Component({
  selector: 'app-job-card',
  imports: [],
  templateUrl: './job-card.html',
  styleUrl: './job-card.css',
})
export class JobCard {
  @Input({ required: true })
  job!: Job;

  getImageUrl = getImageUrl;
  formatSalary = formatSalary;

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;

    img.src = 'https://dummyimage.com/100x100/eeeeee/aaaaaa&text=Logo';
  }
}
