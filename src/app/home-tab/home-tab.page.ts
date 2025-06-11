import { Component, OnInit } from '@angular/core';
import { StatusBar,Style as StatusBarStyle } from '@capacitor/status-bar';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-tab',
  templateUrl: './home-tab.page.html',
  styleUrls: ['./home-tab.page.scss'],
})
export class HomeTabPage implements OnInit {

  // constructor() { }
  jobs: any[] = [];
  categories: any[] = [];


  constructor(private apiService: ApiService,private router:Router) {}

  // ngOnInit() {
  //   // StatusBar.setBackgroundColor({ color: '#ffffff' }); // white
  //     // Set the status bar style to dark (black text/icons)
  //     // StatusBar.setStyle({ style: StatusBarStyle.Dark });
  // }

  ngOnInit() {
    this.apiService.getJobs_forhomepage().subscribe((res) => {
      this.jobs = res;
      console.log(this.jobs);
    });

    this.apiService.getjobCategories().subscribe((res) => {
      if (res.status) {
        this.categories = res.categories;
        console.log(this.categories);
      } else {
        console.error('Failed to fetch job categories');
        this.categories = [];
      }
    });
    
  }


  goToJobDetail(jobId: string) {
    this.router.navigate(['/job-detail', jobId]);
    
  }
  // categories = [
  //   {
  //     title: 'Software Development',
  //     description: 'Explore the latest jobs in software development.',
  //     icon: 'code-slash-outline'
  //   },
  //   {
  //     title: 'Marketing',
  //     description: 'Find marketing roles that match your skills.',
  //     icon: 'megaphone-outline'
  //   },
  //   {
  //     title: 'Design',
  //     description: 'Discover job opportunities in design.',
  //     icon: 'color-palette-outline'
  //   },
  //   {
  //     title: 'Finance',
  //     description: 'Explore finance-related job listings.',
  //     icon: 'cash-outline'
  //   },
  //   {
  //     title: 'Human Resources',
  //     description: 'Find HR roles suited to your expertise.',
  //     icon: 'people-outline'
  //   },
  //   {
  //     title: 'Healthcare',
  //     description: 'Explore job opportunities in the healthcare industry.',
  //     icon: 'medkit-outline'
  //   },
  //   {
  //     title: 'Education',
  //     description: 'Find teaching and education-related jobs.',
  //     icon: 'school-outline'
  //   },
  //   {
  //     title: 'Engineering',
  //     description: 'Discover engineering job listings.',
  //     icon: 'construct-outline'
  //   },
  //   {
  //     title: 'Sales',
  //     description: 'Explore sales and business development roles.',
  //     icon: 'cart-outline'
  //   },
  //   {
  //     title: 'Information Technology',
  //     description: 'Find IT and technology-related job opportunities.',
  //     icon: 'laptop-outline'
  //   },
  //   {
  //     title: 'Accounting',
  //     description: 'Explore accounting and finance-related jobs.',
  //     icon: 'calculator-outline'
  //   },
  //   {
  //     title: 'Administrative',
  //     description: 'Find administrative and office support roles.',
  //     icon: 'list-outline'
  //   }
  // ];

}
