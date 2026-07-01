import { Component, computed, signal } from '@angular/core';
import { JobService } from '../../core/Job/job-service';
import { JobCard } from '../../shared/components/job-card/job-card';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-jobs',
  imports: [JobCard],
  templateUrl: './jobs.html',
  styleUrl: './jobs.css',
  standalone: true,
})
export class Jobs {
  constructor(
    private readonly jobService: JobService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {
    const params = this.route.snapshot.queryParamMap;

    this.search.set(params.get('search') ?? '');

    this.location.set(params.get('location') ?? 'all');

    this.jobTypes.set(params.getAll('type'));

    const min = Number(params.get('minSalary'));
    const max = Number(params.get('maxSalary'));

    if (!Number.isNaN(min) && !Number.isNaN(max)) {
      this.salaryRange.set([min, max]);
    }
  }

  readonly search = signal<string>('');

  readonly location = signal<string>('all');

  readonly jobTypes = signal<string[]>([]);

  readonly salaryRange = signal<[number, number]>([0, 50000]);

  readonly derivedJobs = computed(() => this.jobService.jobList());

  readonly locations = computed(() => {
    const jobs = this.derivedJobs();

    const filteredLocations = new Set(
      jobs.map((job) => job.candidate_required_location).filter(Boolean),
    );

    return ['all', ...filteredLocations];
  });

  readonly jobTypeOptions = computed(() => {
    const jobs = this.derivedJobs();

    const filteredJobTypeOptions = new Set(jobs.map((job) => job.job_type).filter(Boolean));

    return ['all', ...filteredJobTypeOptions];
  });

  readonly salaryBounds = computed(() => {
    const jobs = this.derivedJobs();

    const salaries = jobs
      .map((job) => this.extractSalary(job.salary))
      .filter((value) => value !== null);

    if (!salaries.length) {
      return {
        min: 0,
        max: 50000,
      };
    }

    return {
      min: Math.min(...salaries),
      max: Math.max(...salaries),
    };
  });

  readonly jobs = computed(() => {
    const searchTerm = this.search().toLowerCase().trim();

    const selectedLocation = this.location();

    const selectedTypes = this.jobTypes();

    const [minSalary, maxSalary] = this.salaryRange();

    const jobs = this.derivedJobs();

    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm) ||
        job.company_name.toLowerCase().includes(searchTerm);

      const matchesLocation =
        selectedLocation === 'all' || job.candidate_required_location === selectedLocation;

      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(job.job_type);

      const salary = this.extractSalary(job.salary);

      const matchesSalary = salary === null || (salary >= minSalary && salary <= maxSalary);

      return matchesSearch && matchesLocation && matchesType && matchesSalary;
    });
  });

  onSearch(value: string): void {
    this.search.set(value);
    this.updateQueryParams()
  }

  onLocationChange(value: string): void {
    this.location.set(value);
    this.updateQueryParams()
  }

  toggleJobType(type: string): void {
    this.jobTypes.update((current) =>
      current.includes(type) ? current.filter((item) => item !== type) : [...current, type],
    );

    this.updateQueryParams()
  }

  onMinSalaryChange(value: string): void {
    const salary = Number(value);

    this.salaryRange.update(([_, max]) => [salary, max]);

    this.updateQueryParams()
  }

  onMaxSalaryChange(value: string): void {
    const salary = Number(value);

    this.salaryRange.update(([min]) => [min, salary]);

    this.updateQueryParams()
  }

  clearFilters(): void {
    this.search.set('');

    this.location.set('all');

    this.jobTypes.set([]);

    this.salaryRange.set([this.salaryBounds().min, this.salaryBounds().max]);

    this.updateQueryParams()
  }

  private extractSalary(salaryText?: string): number | null {
    if (!salaryText) return null;

    const match = salaryText.match(/\d+/g);

    if (!match?.length) return null;

    return Number(match[0]);
  }

  private updateQueryParams(): void {
  const [minSalary, maxSalary] = this.salaryRange();

  this.router.navigate([], {
    relativeTo: this.route,
    queryParams: {
      search: this.search() || null,
      location: this.location() === 'all' ? null : this.location(),
      type: this.jobTypes().length ? this.jobTypes() : null,
      minSalary,
      maxSalary,
    },
    queryParamsHandling: 'merge',
  });
}
}
