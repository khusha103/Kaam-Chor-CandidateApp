import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-reg-review',
  templateUrl: './reg-review.page.html',
  styleUrls: ['./reg-review.page.scss'],
})
export class RegReviewPage implements OnInit {
  currentPage: number = 0;
  progress: number = 0;
  userData: any = {};
  states: { [key: string]: string } = {};
  cities: { [key: string]: string } = {};
  languages: { [key: string]: string } = {};
  skills: { [key: string]: string } = {};
  qualifications: { [key: string]: string } = {};
  branches: { [key: string]: string } = {};
  titles: { [key: string]: string } = {};
  universities: { [key: string]: string } = {};
  
  formPages: string[] = ['Education', 'Experience', 'preferences', 'Review'];

  constructor(private router: Router, private apiService: ApiService, private toastController: ToastController) {}

  ionViewWillEnter() {
    this.currentPage = 3;
    this.progress = 100;
    // console.log(this.currentPage);
    // console.log(this.progress);

    // Load all necessary data before fetching user review data
    Promise.all([
      this.loadStates(),
      this.loadCities(),
      this.loadLanguages(),
      this.loadSkills(),
      this.loadQualifications(),
      this.loadBranches(),
      this.loadTitles(),
      this.loadUniversities()
    ]).then(() => {
      this.getUserReviewData(); // Call after all data is loaded
    }).catch(error => {
      console.error('Error loading data:', error);
      this.presentToast('Error loading necessary data. Please try again.');
    });
  }
  ngOnInit() {
    this.currentPage = 3;
    this.progress = 100;
    // console.log(this.currentPage);
    // console.log(this.progress);

    // Load all necessary data before fetching user review data
    Promise.all([
      this.loadStates(),
      this.loadCities(),
      this.loadLanguages(),
      this.loadSkills(),
      this.loadQualifications(),
      this.loadBranches(),
      this.loadTitles(),
      this.loadUniversities()
    ]).then(() => {
      this.getUserReviewData(); // Call after all data is loaded
    }).catch(error => {
      console.error('Error loading data:', error);
      this.presentToast('Error loading necessary data. Please try again.');
    });
  }

  loadStates(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiService.getStates().subscribe(
        (response: any[]) => {
          // console.log('States loaded:', response);
          this.states = response.reduce((acc, state) => {
            acc[state.id] = state.name;
            return acc;
          }, {});
          // console.log('States mapping created:', this.states);
          resolve();
        },
        (error: any) => {
          console.error('Error loading states:', error);
          reject(error);
        }
      );
    });
  }

  loadCities(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiService.getCities().subscribe(
        (response: any[]) => {
          // console.log('Cities loaded:', response);
          this.cities = response.reduce((acc, city) => {
            acc[city.id] = city.name;
            return acc;
          }, {});
          // console.log('Cities mapping created:', this.cities);
          resolve();
        },
        (error: any) => {
          console.error('Error loading cities:', error);
          reject(error);
        }
      );
    });
  }

  loadLanguages(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiService.getLanguages().subscribe(
        (response: any[]) => {
          // console.log('Languages loaded:', response);
          this.languages = response.reduce((acc, language) => {
            acc[language.id] = language.value;
            return acc;
          }, {});
          // console.log('Languages mapping created:', this.languages);
          resolve();
        },
        (error: any) => {
          console.error('Error loading languages:', error);
          reject(error);
        }
      );
    });
  }

  loadSkills(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiService.getSkills().subscribe(
        (response: any[]) => {
          // console.log('Skills loaded:', response);
          this.skills = response.reduce((acc, skill) => {
            acc[skill.id] = skill.value;
            return acc;
          }, {});
          // console.log('Skills mapping created:', this.skills);
          resolve();
        },
        (error: any) => {
          console.error('Error loading skills:', error);
          reject(error);
        }
      );
    });
  }

  loadQualifications(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiService.getEduQual().subscribe(
        (response: any[]) => {
          // console.log('Qualifications loaded:', response);
          this.qualifications = response.reduce((acc, qualification) => {
            acc[qualification.id] = qualification.value;
            return acc;
          }, {});
          // console.log('Qualifications mapping created:', this.qualifications);
          resolve();
        },
        (error: any) => {
          console.error('Error loading qualifications:', error);
          reject(error);
        }
      );
    });
  }

  loadBranches(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiService.getEduBranch().subscribe(
        (response: any[]) => {
          // console.log('Branches loaded:', response);
          this.branches = response.reduce((acc, branch) => {
            acc[branch.id] = branch.value;
            return acc;
          }, {});
          // console.log('Branches mapping created:', this.branches);
          resolve();
        },
        (error: any) => {
          console.error('Error loading branches:', error);
          reject(error);
        }
      );
    });
  }

  loadTitles(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiService.getEduTitle().subscribe(
        (response: any[]) => {
          // console.log('Titles loaded:', response);
          this.titles = response.reduce((acc, title) => {
            acc[title.id] = title.Education_title_name;
            return acc;
          }, {});
          // console.log('Titles mapping created:', this.titles);
          resolve();
        },
        (error: any) => {
          console.error('Error loading titles:', error);
          reject(error);
        }
      );
    });
  }

  loadUniversities(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiService.getUnivName().subscribe(
        (response: any[]) => {
          // console.log('Universities loaded:', response);
          this.universities = response.reduce((acc, university) => {
            acc[university.id] = university.value;
            return acc;
          }, {});
          // console.log('Universities mapping created:', this.universities);
          resolve();
        },
        (error: any) => {
          console.error('Error loading universities:', error);
          reject(error);
        }
      );
    });
  }

  // Repeat similar structure for loadLanguages, loadSkills, loadQualifications, loadBranches, loadTitles, loadUniversities...

  getUserReviewData() {
    const userIdString = localStorage.getItem('userId');
    const userId = userIdString ? Number(userIdString) : null;

    if (userId === null) {
      this.presentToast('User ID is not available. Please log in again.');
      return;
    }

    this.apiService.getUserReviewData(userId).subscribe(
      (response: any) => {
        this.userData = response;
        this.mapUserData(); // Map user data after fetching
      },
      (error: any) => {
        console.error('Error fetching user review data:', error);
      }
    );
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  private mapUserData() {
    // Map state
    this.userData.state = this.states[this.userData.state] || 'Unknown';
    
    // Map city
    this.userData.city = this.cities[this.userData.city] || 'Unknown';

    // Map languages
    this.userData.languages.forEach((lang: { language: string; }) => {
      lang.language = this.languages[lang.language] || 'Unknown';
    });

    // Map skills
    this.userData.skills = this.userData.skills.split(',').map((skillId: string | number) => this.skills[skillId] || 'Unknown').join(', ');

    // Map location states
    this.userData.loc_states = this.userData.loc_states.split(',').map((stateId: string | number) => this.states[stateId] || 'Unknown').join(', ');

    // Map highest qualification
    this.userData.highest_qualification = this.qualifications[this.userData.highest_qualification] || 'Unknown';

    // Map branch of study
    this.userData.branch_of_study = this.branches[this.userData.branch_of_study] || 'Unknown';

    // Map title of education
    this.userData.title_of_education = this.titles[this.userData.title_of_education] || 'Unknown';

    // Map university name
    this.userData.university_name = this.universities[this.userData.university_name] || 'Unknown';

    // Log the mapped user data for debugging
    // console.log('Mapped user data:', this.userData);
  }



  nextPage() {
  }

  previousPage() {
    this.router.navigate(['/reg-skills']);
  }

  editInformation() {
    // Logic to navigate back to edit specific sections
    // console.log('Edit information clicked');
    this.router.navigate(['/reg-skills']);
  }

  submitApplication() {
    // Logic to submit the application
    // console.log('Submit application clicked');
    this.presentToast('Data saved successfully');
    // this.router.navigate(['/home-tab']);
    this.router.navigateByUrl('/tabs/home');
  }
}