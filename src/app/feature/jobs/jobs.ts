import { Component, computed, signal } from '@angular/core';
import { JobCard } from '../../shared/components/job-card/job-card';
import { ActivatedRoute, Router } from '@angular/router';
import { JobFilter } from '../../core/Job/job-filter';
import { JobPagination } from '../../core/Job/job-pagination';

@Component({
  selector: 'app-jobs',
  imports: [JobCard],
  templateUrl: './jobs.html',
  styleUrl: './jobs.css',
  standalone: true,
})
export class Jobs {
  constructor(
    private readonly filter: JobFilter,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly pagination: JobPagination,
  ) {
    const params = this.route.snapshot.queryParamMap;

    this.filter.search.set(params.get('search') ?? '');
    this.filter.location.set(params.get('location') ?? 'all');
    this.filter.jobTypes.set(params.getAll('type'));

    const min = Number(params.get('minSalary'));
    const max = Number(params.get('maxSalary'));

    if (!Number.isNaN(min) && !Number.isNaN(max) && min !== 0 && max !== 0) {
      this.salaryRange.set([min, max]);
    }
  }

  get search() {
    return this.filter.search;
  }

  get location() {
    return this.filter.location;
  }

  get jobTypes() {
    return this.filter.jobTypes;
  }

  get salaryRange() {
    return this.filter.salaryRange;
  }

  get locations() {
    return this.filter.locations;
  }

  get jobTypeOptions() {
    return this.filter.jobTypeOptions;
  }

  get salaryBounds() {
    return this.filter.salaryBounds;
  }

  get jobs() {
    return this.pagination.paginatedJobs;
  }

  get currentPage() {
    return this.pagination.currentPage;
  }

  onSearch(value: string): void {
    this.filter.search.set(value);
    this.pagination.currentPage.set(1);
    this.updateQueryParams();
  }

  onLocationChange(value: string): void {
    this.filter.location.set(value);

    this.pagination.currentPage.set(1);

    this.updateQueryParams();
  }

  toggleJobType(type: string): void {
    this.filter.jobTypes.update((curr) =>
      curr.includes(type) ? curr.filter((t) => t !== type) : [...curr, type],
    );

    this.pagination.currentPage.set(1);

    this.updateQueryParams();
  }

  onMinSalaryChange(value: string): void {
    const salary = Number(value);
    this.filter.salaryRange.update(([_, max]) => [salary, max]);
    this.pagination.currentPage.set(1);
    this.updateQueryParams();
  }

  onMaxSalaryChange(value: string): void {
    const salary = Number(value);
    this.filter.salaryRange.update(([min]) => [min, salary]);
    this.pagination.currentPage.set(1);
    this.updateQueryParams();
  }

  clearFilters(): void {
    this.filter.search.set('');
    this.filter.location.set('all');
    this.filter.jobTypes.set([]);
    this.filter.salaryRange.set([this.filter.salaryBounds().min, this.filter.salaryBounds().max]);

    this.pagination.currentPage.set(1);
    this.updateQueryParams();
  }

  private updateQueryParams(): void {
    const [minSalary, maxSalary] = this.salaryRange();

    const minSalaryVal = minSalary === this.salaryBounds().min ? null : minSalary;
    const maxSalaryVal = maxSalary === this.salaryBounds().max ? null : maxSalary;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: this.search() || null,
        location: this.location() === 'all' ? null : this.location(),
        type: this.jobTypes().length ? this.jobTypes() : null,
        minSalary: minSalaryVal,
        maxSalary: maxSalaryVal,
      },
      queryParamsHandling: 'merge',
    });
  }

  get totalPages() {
    return this.pagination.totalPages;
  }

  nextPage(): void {
    this.pagination.nextPage();
  }

  previousPage(): void {
    this.pagination.previousPage();
  }

  goToPage(page: number): void {
    this.pagination.goToPage(page);
  }
}
