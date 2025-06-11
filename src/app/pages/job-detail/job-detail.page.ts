// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-job-detail',
//   templateUrl: './job-detail.page.html',
//   styleUrls: ['./job-detail.page.scss'],
// })
// export class JobDetailPage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }
//   activeButton: string = 'description';  // Default active button

//   setActiveButton(button: string) {
//     this.activeButton = button;
//   }

// }


import { Component, OnInit } from '@angular/core';
// import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.page.html',
  styleUrls: ['./job-detail.page.scss'],
})
export class JobDetailPage implements OnInit {

  activeButton: string = 'description';
  jobDetail: any;
  jobId: string = '';

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get('id') || '';
    if (this.jobId) {
      this.fetchJobDetail();
    }
  }
  

  setActiveButton(button: string) {
    this.activeButton = button;
  }

  fetchJobDetail() {
    // this.apiService.getJobDetail(this.jobId).subscribe({
    //   next: (data) => {
    //     this.jobDetail  = data;
    //     console.log(this.jobDetail);
    //   },
    //   error: (err) => {
    //     console.error('Error fetching job detail:', err);
    //   }
    // });

    this.apiService.getJobDetail(this.jobId).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.jobDetail = res.data;
        }
      },
      error: (err) => console.error('API Error:', err)
    });
  }

  getLanguageList(): string {
    if (!this.jobDetail || !this.jobDetail.job_languages) return '';
    const uniqueLanguages = new Set(
      this.jobDetail.job_languages.map((lang: { language: any; }) => lang.language)
    );
    return Array.from(uniqueLanguages).join(', ');
  }
  
}
