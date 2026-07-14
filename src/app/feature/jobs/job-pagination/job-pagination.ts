import { Component } from '@angular/core';
import { JobPagination } from '../../../core/Job/job-pagination';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-job-pagination',
  imports: [TranslatePipe],
  templateUrl: './job-pagination.html',
  styleUrl: './job-pagination.css',
})
export class JobPaginationUI {
  constructor(private readonly pagination: JobPagination) {}

  get totalPages() {
    return this.pagination.totalPages;
  }

  get currentPage() {
    return this.pagination.currentPage;
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
