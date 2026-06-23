export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description?: string;
  location: string;
}

export interface Profile {
  skills: string[];
  education: Education[];
  experience: Experience[];
  resume?: string | null;

  companyName?: string;
  companyDescription?: string;
}