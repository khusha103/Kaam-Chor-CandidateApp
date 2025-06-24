import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  searchTerm: string = '';
  jobListings: any[] = [];
  filteredJobListings: any[] = [];
  jobs_count: number = 0;
  categoryId: string | null = null;

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private alertController: AlertController,
    private modalController: ModalController,
    private jobFilterService: JobFilterService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Retrieve categoryId from query parameters
    this.route.queryParams.subscribe((params) => {
      this.categoryId = params['categoryId'] || null;
      this.loadJobListings();
    });

    // Subscribe to filter changes from JobFilterService
    this.jobFilterService.filters$.subscribe((filters) => {
      console.log('Filters received in JobsTagPage:', filters);
      this.applyFilters(filters);
    });
  }

  loadJobListings() {
    this.apiService.getEmployerDetailsWithJobs().subscribe(
      (data) => {
        this.jobListings = data;
        this.filteredJobListings = this.jobListings;
        this.jobs_count = this.filteredJobListings.length;

        // Apply category filter if categoryId exists
        if (this.categoryId) {
          const filters = { ...this.jobFilterService.getFilters(), category: [this.categoryId] };
          this.jobFilterService.setFilters(filters);
          this.applyFilters(filters);
        } else {
          this.applyFilters(this.jobFilterService.getFilters());
        }

        console.log('Job Listings:', this.jobListings);
      },
      (error) => {
        console.error('Error fetching employer details:', error);
        this.jobListings = [];
        this.filteredJobListings = [];
        this.jobs_count = 0;
      }
    );
  }

  applyFilters(filters: any) {
    this.filteredJobListings = this.jobFilterService.filterJobs(this.jobListings, filters);
    this.jobs_count = this.filteredJobListings.length;
    console.log('Filtered Jobs:', this.filteredJobListings);
    console.log('Jobs Count:', this.jobs_count);
  }

  searchJobs(searchTerm: string) {
    if (searchTerm === '') {
      this.showAlert();
      return;
    }
    const filters = { ...this.jobFilterService.getFilters(), keyword: searchTerm };
    this.filteredJobListings = this.jobFilterService.filterJobs(this.jobListings, filters);
    this.jobs_count = this.filteredJobListings.length;

    console.log('Search Filters:', filters);
    console.log('Filtered Job Listings:', this.filteredJobListings);
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Search Box is Empty',
      message: 'Please enter a search term.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  applyForJob(jobId: number) {
    console.log(`Applying for job with ID: ${jobId}`);
  }

  goToJobDetail(jobId: string) {
    this.router.navigate(['/job-detail', jobId]);
  }

  bookmarkJob(jobId: string) {
    console.log('Bookmark clicked for Job ID:', jobId);
  }

  async openFilterMenu() {
    const modal = await this.modalController.create({
      component: JobFilterComponent,
      componentProps: {
        jobListings: this.jobListings,
      },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        console.log('Applied Filters:', result.data.filters);
        this.filteredJobListings = result.data.filteredJobs;
        this.jobs_count = result.data.filteredJobs.length;
      }
    });

    return await modal.present();
  }
}