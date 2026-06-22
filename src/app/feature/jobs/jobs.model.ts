export interface Job {
  id: number;
  title: string;
  company_name: string;
  company_logo_url: string;
  candidate_required_location: string;
  salary: string;
  job_type: string;
  tags: string[];
  url: string;
  description: string;
  recruiterId?: string;
}