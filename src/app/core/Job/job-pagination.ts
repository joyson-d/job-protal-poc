import { computed, Injectable, signal } from '@angular/core';
import { JobFilter } from './job-filter';

@Injectable({
  providedIn: 'root',
})
export class JobPagination {
  constructor(private readonly filter: JobFilter) {}

  readonly currentPage = signal(1);

  readonly pageSize = 9;

  readonly paginatedJobs = computed(() => {
    const jobs = this.filter.jobsList();

    const start = (this.currentPage() - 1) * this.pageSize;

    return jobs.slice(start, start + this.pageSize);
  });

  readonly totalPages = computed(() => Math.ceil(this.filter.jobsList().length / this.pageSize));

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((page) => page + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update((page) => page - 1);
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }
}
