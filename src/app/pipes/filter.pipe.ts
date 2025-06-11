import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appFilter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();
    return items.filter(item => {
      return Object.keys(item).some(key => {
        return String(item[key]).toLowerCase().includes(searchText);
      });
    });
  }
}

//only work for company name till now filter stop on 21 august 


// import { Pipe, PipeTransform } from '@angular/core';

// interface Job {
//   job_title: string;
//   state: string;
//   city: string;
//   salary: number;
//   languages: { language: string; rws: number }[];
// }

// interface Employer {
//   company_name: string;
//   employer_name: string;
//   email: string;
//   job_posts: Job[];
// }

// @Pipe({
//   name: 'appFilter'
// })
// export class FilterPipe implements PipeTransform {
//   transform(employers: Employer[], searchText: string): Employer[] {
//     if (!employers) return [];
//     if (!searchText) return employers;

//     searchText = searchText.toLowerCase();
    
//     return employers.filter(employer => {
//       // Check employer fields
//       const employerMatches = 
//         employer.company_name.toLowerCase().includes(searchText) ||
//         employer.employer_name.toLowerCase().includes(searchText) ||
//         employer.email.toLowerCase().includes(searchText);

//       // Check job posts fields
//       const jobMatches = employer.job_posts.some((job: Job) => {
//         return job.job_title.toLowerCase().includes(searchText) ||
//                job.state.toLowerCase().includes(searchText) ||
//                job.city.toLowerCase().includes(searchText) ||
//                job.salary.toString().includes(searchText) ||
//                job.languages.some(lang => lang.language.toLowerCase().includes(searchText));
//       });

//       // Return true if either employer or job matches
//       return employerMatches || jobMatches;
//     });
//   }
// }