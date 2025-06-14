import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { JobFilterComponent } from '../components/job-filter/job-filter.component';
import { JobFilterService } from '../services/job-filter.service';

@Component({
  selector: 'app-jobs-tab',
  templateUrl: './jobs-tab.page.html',
  styleUrls: ['./jobs-tab.page.scss'],
})
export class JobsTabPage implements OnInit {

  jobs: any[] = [];
  employerData: any[] = [];
  searchTerm: string = "";
  jobListings: any[] = [];
  filteredJobListings: any[] = [];
  jobs_count: number = 0;

  constructor(private http: HttpClient,
    private apiService: ApiService, private router: Router, private alertController: AlertController, private modalController: ModalController, private jobFilterService: JobFilterService) { }

  ngOnInit() {
    this.loadJobListings();

    this.jobFilterService.filters$.subscribe((filters) => {
      console.log('Filters received in JobsTabPage:', filters);
      this.applyFilters(filters);
    });
  }

  // applyFilters(filters: any) {
  //   let filteredJobs = [...this.jobListings];

  //   console.log('Original Jobs:', this.jobListings);
  //   console.log('Applied Filters:', filters);

  //   // ✅ Filter by category (job_category)
  //   if (filters.category && filters.category.length > 0) {
  //     filteredJobs = filteredJobs.filter(job =>
  //       filters.category.includes(String(job.job_category))
  //     );
  //   }

  //   // ✅ Filter by location (state_id)
  //   if (filters.location && filters.location.length > 0) {
  //     filteredJobs = filteredJobs.filter(job =>
  //       filters.location.includes(String(job.state_id))
  //     );
  //   }

  //   // ✅ Filter by skills (handle comma-separated skills)
  //   if (filters.skills && filters.skills.length > 0) {
  //     filteredJobs = filteredJobs.filter(job => {
  //       const jobSkills = job.skills?.toString().split(',').map((s: string) => s.trim());
  //       return jobSkills?.some((skill: any) => filters.skills.includes(skill));
  //     });
  //   }

  //   // ✅ Filter by experience range (if both min and max provided)
  //   if (filters.experience?.min !== null && filters.experience?.max !== null) {
  //     filteredJobs = filteredJobs.filter(job => {
  //       const jobExpMatches = job.experience?.match(/(\d+)/g); // ['1', '3'] from '1 - 3 Years'
  //       if (!jobExpMatches || jobExpMatches.length < 2) return false;
  //       const jobMinExp = parseInt(jobExpMatches[0]);
  //       const jobMaxExp = parseInt(jobExpMatches[1]);
  //       return (
  //         jobMinExp >= filters.experience.min && jobMaxExp <= filters.experience.max
  //       );
  //     });
  //   }

  //   // ✅ Filter by minSalary if provided
  //   if (filters.salary && filters.salary > 0) {
  //     filteredJobs = filteredJobs.filter(job => {
  //       const numericSalary = Number(job.salary.replace(/[₹,]/g, '').trim());
  //       return numericSalary >= filters.salary;
  //     });
  //   }

  //   // ✅ Filter by keyword in job_title
  //   if (filters.keyword && filters.keyword.trim() !== '') {
  //     filteredJobs = filteredJobs.filter(job =>
  //       job.job_title.toLowerCase().includes(filters.keyword.toLowerCase())
  //     );
  //   }

  //   // ✅ Filter by remote (if applicable)
  //   if (filters.remote === true) {
  //     filteredJobs = filteredJobs.filter(job => job.remote === true);
  //   }

  //   // FINAL assignment + logs
  //   this.filteredJobListings = filteredJobs;
  //   this.jobs_count = filteredJobs.length;

  //   console.log('Filtered Jobs:', this.filteredJobListings);
  //   console.log('Jobs Count:', this.jobs_count);
  // }


  applyFilters(filters: any) {
    this.filteredJobListings = this.jobFilterService.filterJobs(this.jobListings, filters);
    this.jobs_count = this.filteredJobListings.length;
    console.log('Filtered Jobs:', this.filteredJobListings);
    console.log('Jobs Count:', this.jobs_count);
  }


  performSearch() {
    console.log('Search button clicked');
    // Call your search function here
    this.searchJobs(this.searchTerm);
  }


  // searchJobs(searchTerm: string) {
  //   if (searchTerm === '') {
  //     this.showAlert();
  //   } else {
  //     this.filteredJobListings = this.jobListings.filter((job) => {
  //       return job.job_title.toLowerCase().includes(searchTerm.toLowerCase());
  //     });
  //   }
  // }

  searchJobs(searchTerm: string) {
  if (searchTerm === '') {
    this.showAlert();
    return;
  }
  const filters = { ...this.jobFilterService.getFilters(), keyword: searchTerm };
  this.filteredJobListings = this.jobFilterService.filterJobs(this.jobListings, filters);
  this.jobs_count = this.filteredJobListings.length;
}

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Search Box is Empty',
      message: 'Please enter a search term.',
      buttons: ['OK'],
    });

    await alert.present();
  }





  // loadJobListings() {
  //   this.apiService.getEmployerDetailsWithJobs().subscribe(
  //     (data) => {
  //       console.log("check");
  //       this.jobListings = data;

  //       this.filteredJobListings = this.jobListings; // Update filtered array here
  //       this.jobs_count = this.filteredJobListings[0].jobscount;
  //       console.log("count", this.jobs_count);
  //       console.log(this.employerData);
  //     },
  //     (error) => {
  //       console.error('Error fetching employer details:', error);
  //     }
  //   );
  // }

loadJobListings() {
  this.apiService.getEmployerDetailsWithJobs().subscribe(
    (data) => {
      this.jobListings = data;
      this.filteredJobListings = this.jobListings;
      this.jobs_count = this.filteredJobListings.length; // Use length
      console.log('Job Listings:', this.jobListings);
    },
    (error) => {
      console.error('Error fetching employer details:', error);
    }
  );
}

  applyForJob(jobId: number) {
    console.log(`Applying for job with ID: ${jobId}`);
  }

  viewJob() {
    this.router.navigate(['/job-detail']);
  }


  goToJobDetail(jobId: string) {
    this.router.navigate(['/job-detail', jobId]);
  }

  bookmarkJob(jobId: string) {
    // Add your bookmark logic here (e.g. save to localStorage or backend)
    console.log('Bookmark clicked for Job ID:', jobId);
  }

  async openFilterMenu() {
    const modal = await this.modalController.create({
      component: JobFilterComponent,
      componentProps: {
        jobListings: this.jobListings // 👈 Pass full job list to filter component
      }

    });
    console.log("sended props", this.jobListings);


    // modal.onDidDismiss().then((result) => {
    //   if (result.data) {
    //     console.log('Applied Filters:', result.data);
    //     this.filteredJobListings = result.data; // 👈 Update view in parent with filtered results
    //     this.jobs_count = result.data.length;   // Optional: count of filtered jobs
    //   }
    // });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        console.log('Applied Filters:', result.data.filters);
        this.filteredJobListings = result.data.filteredJobs; // Correctly assign filteredJobs
        this.jobs_count = result.data.filteredJobs.length;
      }
    });

    return await modal.present();
  }



}
