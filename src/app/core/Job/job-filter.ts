import { computed, Injectable, signal } from '@angular/core';
import { JobService } from './job-service';

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

  readonly locations = computed(() => {
    const filteredLocations = new Set(
      this.jobs()
        .map((job) => job.candidate_required_location)
        .filter(Boolean),
    );

    return ['all', ...filteredLocations];
  });

  readonly jobTypeOptions = computed(() => {
    const filteredJobTypeOptions = new Set(
      this.jobs()
        .map((job) => job.job_type)
        .filter(Boolean),
    );

    return [...filteredJobTypeOptions];
  });

  readonly salaryBounds = computed(() => {
    const salaries = this.jobs()
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

  readonly jobsList = computed(() => {
    const searchTerm = this.search().toLowerCase().trim();

    const selectedLocation = this.location();

    const selectedTypes = this.jobTypes();

    const [minSalary, maxSalary] = this.salaryRange();

    return this.jobs().filter((job) => {
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

  private extractSalary(salaryText?: string): number | null {
    if (!salaryText) return null;

    const match = salaryText.match(/\d+/g);

    if (!match?.length) return null;

    return Number(match[0]);
  }
}
