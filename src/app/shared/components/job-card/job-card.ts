import { Component, Input } from '@angular/core';
import { Job } from '../../../core/Job/jobs.model';
import { getImageUrl } from '../../../shared/utils/getImageUrl';
import { formatSalary } from '../../../shared/utils/formatSalary';
import { RouterLink } from '@angular/router';
import { SavedJobButton } from '../../../shared/components/saved-job-button/saved-job-button';
import { AuthService } from '../../../core/auth/auth-service';
import { formatJobType } from '../../utils/formatJobType';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-job-card',
  imports: [RouterLink,SavedJobButton,TranslatePipe,],
  templateUrl: './job-card.html',
  styleUrl: './job-card.css',
    standalone:true
})
export class JobCard {
  @Input({ required: true })
  job!: Job;

  constructor(private authService:AuthService){}

  getImageUrl = getImageUrl;
  formatSalary = formatSalary;
  formatJobType=formatJobType

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;

    img.src = 'https://dummyimage.com/100x100/eeeeee/aaaaaa&text=Logo';
  }

  get isUserAuthenticated(){
    return this.authService.isAuthenticated
  }
}
