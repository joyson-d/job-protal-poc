import { Component, computed, OnInit, signal } from '@angular/core';

import { Job } from '../../core/Job/jobs.model';

import { JobService } from '../../core/Job/job-service';
import { JobCard } from '../../shared/components/job-card/job-card';

@Component({
  selector: 'app-jobs',
  imports: [JobCard],
  templateUrl: './jobs.html',
  styleUrl: './jobs.css',
  standalone: true,
})
export class Jobs {
   constructor(private readonly jobService: JobService) {}

  readonly search = signal<string>('');

  readonly location = signal<string>('all');

  readonly jobTypes = signal<string[]>([]);

  readonly salaryRange = signal<[number, number]>([0, 50000]);

  readonly locations = computed(() => [
    'all',
    ...new Set(
      this.jobService
        .jobList()
        .map((job) => job.candidate_required_location)
        .filter(Boolean)
    ),
  ]);

  readonly jobTypeOptions = computed(() => [
    ...new Set(
      this.jobService
        .jobList()
        .map((job) => job.job_type)
        .filter(Boolean)
    ),
  ]);

  readonly salaryBounds = computed(() => {
    const salaries = this.jobService
      .jobList()
      .map((job) => this.extractSalary(job.salary))
      .filter((salary): salary is number => salary !== null);

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

    return this.jobService.jobList().filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm) ||
        job.company_name.toLowerCase().includes(searchTerm);

      const matchesLocation =
        selectedLocation === 'all' ||
        job.candidate_required_location === selectedLocation;

      const matchesType =
        selectedTypes.length === 0 ||
        selectedTypes.includes(job.job_type);

      const salary = this.extractSalary(job.salary);

      const matchesSalary =
        salary === null ||
        (salary >= minSalary && salary <= maxSalary);

      return (
        matchesSearch &&
        matchesLocation &&
        matchesType &&
        matchesSalary
      );
    });
  });

  onSearch(value: string): void {
    this.search.set(value);
  }

  onLocationChange(value: string): void {
    this.location.set(value);
  }

  toggleJobType(type: string): void {
    this.jobTypes.update((current) =>
      current.includes(type)
        ? current.filter((item) => item !== type)
        : [...current, type]
    );
  }

  onMinSalaryChange(value: string): void {
    const salary = Number(value);

    this.salaryRange.update(([_, max]) => [salary, max]);
  }

  onMaxSalaryChange(value: string): void {
    const salary = Number(value);

    this.salaryRange.update(([min]) => [min, salary]);
  }

  clearFilters(): void {
    this.search.set('');

    this.location.set('all');

    this.jobTypes.set([]);

    this.salaryRange.set([
      this.salaryBounds().min,
      this.salaryBounds().max,
    ]);
  }

  

  private extractSalary(salaryText?: string): number | null {
    if (!salaryText) return null;

    const match = salaryText.match(/\d+/g);

    if (!match?.length) return null;

    return Number(match[0]);
  }
}
