import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.page.html',
  styleUrls: ['./applied-jobs.page.scss'],
})
export class AppliedJobsPage implements OnInit {

  // constructor() { }

  // ngOnInit() {
  // }

  // appliedJobs = [
  //   {
  //     title: 'UX Designer',
  //     company: 'Tech Innovators Inc.',
  //     status: 'In Progress',
  //     appliedDate: '2023-08-15',
  //     companyLogo: 'assets/logos/1.jpg'
  //   },
  //   {
  //     title: 'Frontend Developer',
  //     company: 'WebCraft Solutions',
  //     status: 'Rejected',
  //     appliedDate: '2023-08-10',
  //     companyLogo: 'assets/logos/2.jpg'
  //   },
  //   {
  //     title: 'Product Manager',
  //     company: 'InnovateCorp',
  //     status: 'Accepted',
  //     appliedDate: '2023-08-05',
  //     companyLogo: 'assets/logos/3.jpg'
  //   },
  //   {
  //     title: 'UX Designer',
  //     company: 'Tech Innovators Inc.',
  //     status: 'In Progress',
  //     appliedDate: '2023-08-15',
  //     companyLogo: 'assets/logos/1.jpg'
  //   },
  //   {
  //     title: 'Frontend Developer',
  //     company: 'WebCraft Solutions',
  //     status: 'Rejected',
  //     appliedDate: '2023-08-10',
  //     companyLogo: 'assets/logos/2.jpg'
  //   },
  //   {
  //     title: 'Product Manager',
  //     company: 'InnovateCorp',
  //     status: 'Accepted',
  //     appliedDate: '2023-08-05',
  //     companyLogo: 'assets/logos/3.jpg'
  //   },
  //   // Add more job objects as needed
  // ];

  // segmentChanged(ev: any) {
  //   console.log('Segment changed', ev);
  //   // Implement filtering logic here
  // }

  // viewDetails(job: any) {
  //   console.log('View details', job);
  //   // Implement view details logic
  // }

  // withdraw(job: any) {
  //   console.log('Withdraw application', job);
  //   // Implement withdraw logic
  // }


  // selectedSegment: string = 'applied';
  // appliedJobs: any[] = [];
  // savedJobs: any[] = [];
  // userId = '123'; // Replace with actual user ID from auth/session

  // constructor(private api: ApiService) {}

  // ngOnInit() {
  //   this.fetchJobs();
  // }

  // fetchJobs() {
  //   this.api.getAppliedJobs(this.userId).subscribe(res => {
  //     this.appliedJobs = res.data || [];
  //   });

  //   this.api.getSavedJobs(this.userId).subscribe(res => {
  //     this.savedJobs = res.data || [];
  //   });
  // }

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
    // const userId = localStorage.getItem('userId');
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
  

}
