const noticePeriodData =[
  '0','15','30','60','90'
] as const

export type NoticePeriodType =( typeof noticePeriodData)[number]
export type JobApplicationType = {
  // Application
  id: string;
  jobId: number;

  // User Information
  applicantId: string;
  recruiterId?: string;

  // Experience
  totalExperience: string;
  relevantExperience: string;

  // Current Details
  currentLocation: string;
  noticePeriod: NoticePeriodType;

  // Metadata
  appliedAt: string;
};
