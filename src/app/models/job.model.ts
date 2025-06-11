// src/app/models/job.model.ts
export interface Language {
    language_id: string;
    language: string;
    rws: string;
  }
  
  export interface Job {
    job_id: string;
    job_title: string;
    job_description: string;
    state: string;
    city: string;
    salary: number;
    posted_on: string;
    languages: Language[];
    company_logo?: string; // Optional if not always provided
  }
  
  export interface Employer {
    employer_id: string;
    employer_name: string;
    email: string;
    company_name: string;
    job_posts: Job[];
  }