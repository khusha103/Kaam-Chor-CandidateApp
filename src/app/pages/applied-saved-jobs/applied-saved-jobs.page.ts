import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-applied-saved-jobs',
  templateUrl: './applied-saved-jobs.page.html',
  styleUrls: ['./applied-saved-jobs.page.scss'],
})
export class AppliedSavedJobsPage implements OnInit {

  selectedTab = 'applied';
   appliedJobs: any[] = [];
   savedJobs: any[] = [];
 
   constructor(private api: ApiService,private router:Router,private storage: Storage) {
    this.initStorage();
   }
   
   async initStorage() {
    await this.storage.create();
  }
 
   ngOnInit() {
     this.loadJobs();
   }
 
   async loadJobs() {
    //  const userId = localStorage.getItem('userId');
        const userId= await this.storage.get('userId') || null;
    console.log('Retrieved userId:', userId);
   
     if (userId) {
       this.api.getAppliedJobs(userId).subscribe((res: any) => {
         this.appliedJobs = res.data || [];
       });
   
       this.api.getSavedJobs(userId).subscribe((res: any) => {
         this.savedJobs = res.data || [];
       });
     } else {
       // Handle the case where userId is null (e.g., redirect to login page)
       this.router.navigate(['/login']);
     }
   }
   
   goToJobDetail(jobId: string) {
    this.router.navigate(['/job-detail', jobId]);
  }
}
