import { computed, Injectable, signal } from '@angular/core';
import { JobService } from './job-service';
import {
  extractJobTypesFromJobs,
  extractLocationFromJob,
  extractSalary,
  extractSalaryFromJobs,
  filteredJobs,
  getValidJobLocation,
  getValidJobType,
} from '../../shared/utils/job.utils';

@Injectable({
  providedIn: 'root',
})
export class JobFilter {
  constructor(private readonly jobService: JobService) {}

  readonly jobs = computed(() => this.jobService.jobList());

  readonly search = signal('');
  readonly location = signal('all');
  readonly jobTypes = signal<string[]>([]);
  readonly salaryRange = signal<[number, number]>([0, 50000]);

  initializeFilter(
    searchParams: string,
    locationParams: string,
    jobTypesParams: string[],
    minSalaryParams: number,
    maxSalaryParams: number,
  ) {
    const jobList = this.jobs();

    const validatedJobTypeParams = jobTypesParams
      .map((jobType) => getValidJobType(jobList, jobType))
      .filter((jobType): jobType is string => jobType !== undefined);

    const validLocation = getValidJobLocation(jobList, locationParams);

    this.search.set(searchParams);
    this.location.set(validLocation);
    this.jobTypes.set(validatedJobTypeParams);

    if (
      !Number.isNaN(minSalaryParams) &&
      !Number.isNaN(maxSalaryParams) &&
      minSalaryParams !== 0 &&
      maxSalaryParams !== 0
    ) {
      this.salaryRange.set([minSalaryParams, maxSalaryParams]);
    }
  }

  readonly locations = computed(() => {
    const filteredLocations = extractLocationFromJob(this.jobs());

    return ['all', ...filteredLocations];
  });

  readonly jobTypeOptions = computed(() => {
    const filteredJobTypeOptions = extractJobTypesFromJobs(this.jobs());

    return [...filteredJobTypeOptions];
  });

  readonly salaryBounds = computed(() => {
    return extractSalaryFromJobs(this.jobs());
  });

  readonly jobsList = computed(() => {
    const searchTerm = this.search().toLowerCase().trim();

    const selectedLocation = this.location();

    const selectedTypes = this.jobTypes();

    const [minSalary, maxSalary] = this.salaryRange();

    const filteredJobList = filteredJobs(
      this.jobs(),
      searchTerm,
      selectedLocation,
      selectedTypes,
      minSalary,
      maxSalary,
    );

    return filteredJobList;
  });
}
