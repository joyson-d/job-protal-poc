import { Component, computed, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { getImageUrl } from '../../shared/utils/getImageUrl';
import { AuthService } from '../../core/auth/auth-service';
import { SavedJobButton } from '../../shared/components/saved-job-button/saved-job-button';
import { JobService } from '../../core/Job/job-service';
import { ApplyJobButton } from './apply-job-button/apply-job-button';
import { formatJobType } from '../../shared/utils/formatJobType';
import { TranslatePipe } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { NavigationService } from '../../core/shared/navigation';
import { ShareJob } from '../../shared/components/share-job/share-job';

@Component({
  selector: 'app-job-details',
  imports: [RouterLink, SavedJobButton, ApplyJobButton, TranslatePipe, ShareJob],
  templateUrl: './job-details.html',
  styleUrl: './job-details.css',
})
export class JobDetails {
  getImageUrl = getImageUrl;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private jobService: JobService,
    private navigationService: NavigationService,
    private router: Router,
  ) {}

  formatJobType = formatJobType;

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;

    img.src = 'https://dummyimage.com/100x100/eeeeee/aaaaaa&text=Logo';
  }

  readonly job = computed(() => {
    const jobId = Number(this.route.snapshot.paramMap.get('id'));

    return this.jobService.getJobById(jobId);
  });

  get isUserAuthenticated() {
    return this.authService.isAuthenticated;
  }

  goBack() {
    const previousUrl = this.navigationService.getPreviousUrl();
    const currentUrl = this.navigationService.getCurrentUrl();

    if (previousUrl && currentUrl != previousUrl) {
      this.router.navigateByUrl(previousUrl);
    } else {
      this.router.navigate(['/']);
    }
  }
}
