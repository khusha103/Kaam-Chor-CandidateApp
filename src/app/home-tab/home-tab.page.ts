import { Component, OnInit } from '@angular/core';
import { StatusBar,Style as StatusBarStyle } from '@capacitor/status-bar';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home-tab',
  templateUrl: './home-tab.page.html',
  styleUrls: ['./home-tab.page.scss'],
})
export class HomeTabPage implements OnInit {

  // constructor() { }
  jobs: any[] = [];
  categories: any[] = [];
   last_updated_on: String = "";
  username: String = "";
  user_email:String ="";


  constructor(private apiService: ApiService,private router:Router,private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
  }

  ngOnInit() {
    this.apiService.getJobs_forhomepage().subscribe((res) => {
      this.jobs = res;
      console.log(this.jobs);
    });

    this.apiService.getjobCategories().subscribe((res) => {
      if (res.status) {
        this.categories = res.categories;
        console.log(this.categories);

//         0
// : 
// description
// : 
// "Explore job opportunities in software development."
// icon
// : 
// "code-slash-outline"
// id
// : 
// "8"
// title
// : 
// "Software Development"

      } else {
        console.error('Failed to fetch job categories');
        this.categories = [];
      }
    });

    this.getprofileData();
    
  }
   async getprofileData() {
    // const userId = localStorage.getItem('userId');
    // Retrieve userId from Preferences
    // const { value } = await Preferences.get({ key: 'userId' });
    // const userId = value;
    // console.log('Retrieved userId:', userId);
    const userId= await this.storage.get('userId') || null;
    console.log('Retrieved userId:', userId);


    if (userId) {
      this.apiService.getFormData('aboutMeForm', userId).subscribe(
        (response) => {
          // console.log('Fetched data:', response); 

          if (response && response.status) {
            const data = response.data;

            this.username = data.name;
            this.last_updated_on = data.updated_on;
            this.user_email=data.email;


          } else {
            console.log('No data found for the specified key.');

          }
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    }
  }


goToJobDetail(jobId: string) {
    this.router.navigate(['/job-detail', jobId]);
  }

 goToJobsPage(categoryId: string) {
  this.router.navigate(['/jobs-tab'], { queryParams: { categoryId: categoryId } });
}

}
