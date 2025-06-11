import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { JobFilterComponent } from '../components/job-filter/job-filter.component';

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
  filteredJobListings : any[] = [];
  jobs_count: number = 0;

  ngOnInit() {
    this.loadJobListings();
  }

  constructor(private http: HttpClient,
    private apiService: ApiService, private router: Router,private alertController:AlertController,private modalController:ModalController) { }


    // searchJobs(searchTerm: string) {
    //   if (searchTerm === '') {
    //     this.filteredJobListings = this.jobListings;
    //   } else {
    //     this.filteredJobListings = this.jobListings.filter((employer) => {
    //       return employer.some((job: { job_title: string; }) => {
    //         return job.job_title.toLowerCase().includes(searchTerm.toLowerCase());
    //       });
    //     });
    //   }
    // }
  

    
    performSearch() {
      console.log('Search button clicked');
      // Call your search function here
      this.searchJobs(this.searchTerm);
    }
    
    // searchJobs(searchTerm: string) {
    //   if (searchTerm === '') {
    //     this.filteredJobListings = this.jobListings;
    //   } else {
    //     this.filteredJobListings = this.jobListings.filter((job) => {
    //       return job.job_title.toLowerCase().includes(searchTerm.toLowerCase());
    //     });
    //   }
    // }

    searchJobs(searchTerm: string) {
      if (searchTerm === '') {
        this.showAlert();
      } else {
        this.filteredJobListings = this.jobListings.filter((job) => {
          return job.job_title.toLowerCase().includes(searchTerm.toLowerCase());
        });
      }
    }
    
    async showAlert() {
      const alert = await this.alertController.create({
        header: 'Search Box is Empty',
        message: 'Please enter a search term.',
        buttons: ['OK'],
      });
    
      await alert.present();
    }
    
    
    
   

  loadJobListings() {
    this.apiService.getEmployerDetailsWithJobs().subscribe(
      (data) => {
        console.log("check");
        this.jobListings = data;

        this.filteredJobListings = this.jobListings; // Update filtered array here
                this.jobs_count = this.filteredJobListings[0].jobscount;
        console.log("count",this.jobs_count);
        console.log(this.employerData);
      },
      (error) => {
        console.error('Error fetching employer details:', error);
      }
    );
  }



  applyForJob(jobId: number) {
    console.log(`Applying for job with ID: ${jobId}`);
  }

  viewJob(){
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
    });
  
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        console.log('Applied Filters:', result.data);
        // You can now filter `this.jobListings` based on `result.data`
      }
    });
  
    return await modal.present();
  }
  
}
