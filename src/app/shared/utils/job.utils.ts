import { Job } from '../../core/Job/jobs.model';

export function extractLocationFromJob(jobs: Job[]) {
  return new Set(jobs.map((job) => job.candidate_required_location).filter(Boolean));
}

export function extractJobTypesFromJobs(jobs: Job[]) {
  return new Set(jobs.map((job) => job.job_type).filter(Boolean));
}

export function extractSalaryFromJobs(jobs: Job[]) {
  const salaries = jobs.map((job) => extractSalary(job.salary)).filter((value) => value !== null);

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
}

//depend function
export function extractSalary(salaryText?: string): number | null {
  if (!salaryText) return null;

  const match = salaryText.match(/\d+/g);

  if (!match?.length) return null;

  return Number(match[0]);
}

export function filteredJobs(
  jobs: Job[],
  searchTerm: string,
  selectedLocation: string,
  selectedTypes: string[],
  minSalary: number,
  maxSalary: number,
) {
  return jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm) ||
      job.company_name.toLowerCase().includes(searchTerm);

    const matchesLocation =
      selectedLocation === 'all' || job.candidate_required_location === selectedLocation;

    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(job.job_type);

    const salary = extractSalary(job.salary);

    const matchesSalary = salary === null || (salary >= minSalary && salary <= maxSalary);

    return matchesSearch && matchesLocation && matchesType && matchesSalary;
  });
}

export function getValidJobType(jobs: Job[], jobType: string) {
  const jobTypes = extractJobTypesFromJobs(jobs);

  return jobTypes.has(jobType) ? jobType : undefined;
}

export function getValidJobLocation(jobs: Job[], location: string) {
  const locations = Array.from(extractLocationFromJob(jobs));

  const normalizedInput = location.toLowerCase().trim();

  // 1. Exact match
  const exactMatch = locations.find((loc) => loc.toLowerCase() === normalizedInput);

  if (exactMatch) return exactMatch;

  // 2. Starts-with match (handles minor typos / partial input)
  const partialMatch = locations.find((loc) => loc.toLowerCase().startsWith(normalizedInput));

  if (partialMatch) return partialMatch;

  // 3. Includes match (last fallback)
  const includesMatch = locations.find((loc) => loc.toLowerCase().includes(normalizedInput));

  if (includesMatch) return includesMatch;

  // 4. Final fallback (IMPORTANT)
  return 'all';
}
