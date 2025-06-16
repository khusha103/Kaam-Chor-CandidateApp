import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobFilterService {
  private filtersSubject = new BehaviorSubject<any>({});
  filters$ = this.filtersSubject.asObservable();

  setFilters(filters: any) {
    this.filtersSubject.next(filters);
  }

  getFilters() {
    return this.filtersSubject.value;
  }

  clearFilters() {
    this.filtersSubject.next({
      category: [],
      location: [],
      skills: [],
      jobType: '',
      remote: false,
      salary: 0,
      experience: { min: null, max: null },
      keyword: '',
    });
  }

  filterJobs(jobListings: any[], filters: any): any[] {
    // ... existing filterJobs logic ...
    let filteredJobs = [...jobListings];
    if (filters.category?.length > 0) {
      filteredJobs = filteredJobs.filter((job) =>
        filters.category.includes(String(job.job_category))
      );
    }
    if (filters.location?.length > 0) {
      filteredJobs = filteredJobs.filter((job) =>
        filters.location.includes(String(job.state_id))
      );
    }
    if (filters.skills?.length > 0) {
      filteredJobs = filteredJobs.filter((job) => {
        const jobSkills = job.skills?.toString().split(',').map((s: string) => s.trim());
        return jobSkills?.some((skill: any) => filters.skills.includes(skill));
      });
    }
    if (filters.experience?.min !== null && filters.experience?.max !== null) {
      filteredJobs = filteredJobs.filter((job) => {
        if (!job.experience) return false;
        const jobExpMatches = job.experience.match(/(\d+)/g);
        if (!jobExpMatches || jobExpMatches.length < 2) return false;
        const jobMinExp = parseInt(jobExpMatches[0], 10) || 0;
        const jobMaxExp = parseInt(jobExpMatches[1], 10) || 30;
        const filterMinExp = filters.experience.min === '0' ? 0 : filters.experience.min === '30' ? 30 : parseInt(filters.experience.min, 10);
        const filterMaxExp = filters.experience.max === '30' ? 30 : parseInt(filters.experience.max, 10);
        return jobMinExp >= filterMinExp && jobMaxExp <= filterMaxExp;
      });
    }
    if (filters.salary && filters.salary > 0) {
      filteredJobs = filteredJobs.filter((job) => {
        if (!job.salary) return false;
        const numericSalary = parseFloat(job.salary.replace(/[^0-9.]/g, '')) || 0;
        return numericSalary >= filters.salary;
      });
    }
    if (filters.keyword?.trim() !== '') {
      filteredJobs = filteredJobs.filter((job) =>
        job.job_title.toLowerCase().includes(filters.keyword.toLowerCase())
      );
    }
    if (filters.remote === true) {
      filteredJobs = filteredJobs.filter((job) => job.remote === true);
    }

    console.log("filters.jobType",filters.jobType);
     // Filter by job type (new)
   if (filters.jobType && filters.jobType !== '') {
  filteredJobs = filteredJobs.filter((job) => {
    const normalizedJobType = job.job_type
      .toLowerCase()
      .replace(/\s+/g, ''); // Remove spaces, e.g., "full time" -> "fulltime"
    return normalizedJobType === filters.jobType.toLowerCase();
  });
}
    return filteredJobs;
  }
}