import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.page.html',
  styleUrls: ['./saved-jobs.page.scss'],
})
export class SavedJobsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  savedJobs = [
    {
      title: 'Senior UI/UX Designer',
      company: 'DesignMasters Co.',
      location: 'San Francisco, CA',
      salary: '$90k - $120k',
      type: 'Full-time',
      companyLogo: 'assets/logos/1.jpg'
    },
    {
      title: 'Full Stack Developer',
      company: 'TechGenius Inc.',
      location: 'New York, NY',
      salary: '$80k - $110k',
      type: 'Remote',
      companyLogo: 'assets/logos/2.jpg'
    },
    {
      title: 'Marketing Specialist',
      company: 'GrowthHackers Ltd.',
      location: 'Chicago, IL',
      salary: '$60k - $80k',
      type: 'Contract',
      companyLogo: 'assets/logos/3.jpg'
    },
    {
      title: 'Senior UI/UX Designer',
      company: 'DesignMasters Co.',
      location: 'San Francisco, CA',
      salary: '$90k - $120k',
      type: 'Full-time',
      companyLogo: 'assets/logos/1.jpg'
    },
    {
      title: 'Full Stack Developer',
      company: 'TechGenius Inc.',
      location: 'New York, NY',
      salary: '$80k - $110k',
      type: 'Remote',
      companyLogo: 'assets/logos/2.jpg'
    },
    {
      title: 'Marketing Specialist',
      company: 'GrowthHackers Ltd.',
      location: 'Chicago, IL',
      salary: '$60k - $80k',
      type: 'Contract',
      companyLogo: 'assets/logos/3.jpg'
    },
    // Add more job objects as needed
  ];

  unsaveJob(job: any) {
    console.log('Unsave job', job);
    // Implement unsave logic
  }
}
