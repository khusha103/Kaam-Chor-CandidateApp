import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar, Style as StatusBarStyle } from '@capacitor/status-bar';
import { ApiService } from '../services/api.service';
import { finalize, Observable } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.page.html',
  styleUrls: ['./profile-tab.page.scss'],
})
export class ProfileTabPage implements OnInit {
  last_updated_on: String = '';
  username: String = '';
  user_email: String = '';

  profileImageUrl: string | null = null;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private toastCtrl: ToastController,
    private storage: Storage
  ) {
    this.initStorage();
  }
  async initStorage() {
    await this.storage.create();
  }

  async loadProfileImage() {
    const userId = await this.storage.get('userId');
    if (!userId) return;

    this.apiService.getprofileByUserId(userId).subscribe({
      next: (res) => {
        if (res?.file_url) {
          this.profileImageUrl = res.file_url;
        } else {
          console.warn('No profile image found');
        }
      },
      error: (err) => {
        console.error('Failed to load profile image:', err);
      },
    });
  }

  ngOnInit() {
    // StatusBar.setBackgroundColor({ color: '#ffffff' }); // white
    // Set the status bar style to dark (black text/icons)
    // StatusBar.setStyle({ style: StatusBarStyle.Dark });
    // this.getResume();
    this.getprofileData();
    this.loadProfileImage();
  }

  async getprofileData() {
    // const userId = localStorage.getItem('userId');
    const userId = (await this.storage.get('userId')) || null;
    console.log('userId', userId);

    if (userId) {
      this.apiService.getFormData('aboutMeForm', userId).subscribe(
        (response) => {
          // console.log('Fetched data:', response);

          if (response && response.status) {
            const data = response.data;
            this.username = data.name;
            this.last_updated_on = data.updated_on;
            this.user_email = data.email;
            this.getResume();
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

  openResume() {
    if (this.uploadedResumeUrl) {
      window.open(this.uploadedResumeUrl, '_blank');
    } else {
      // Optional: Show a toast or alert if URL is missing
      this.showToast('No resume available to view.');
    }
  }

  async getResume() {
    const userId = (await this.storage.get('userId')) || null;
    console.log('userId', userId);
    this.apiService.getResume(userId).subscribe({
      next: (res) => {
        if (res.status && res.resume_url) {
          this.uploadedResumeUrl = res.resume_url;
        } else {
          this.uploadedResumeUrl = null;
        }
      },
      error: () => {
        this.uploadedResumeUrl = null;
      },
    });
  }

  navigateToSavesPage() {
    this.router.navigate(['/saved-jobs']);
  }
  navigateToApplicationsPage() {
    this.router.navigate(['/applied-jobs']);
  }

  // logout() {
  //   localStorage.removeItem('isLoggedIn');
  //   localStorage.removeItem('userId');
  //   this.router.navigate(['/login']);
  // }

  // logout() {
  //   localStorage.clear(); // This removes all localStorage entries
  //   this.router.navigate(['/login']);
  // }

  async logout() {
    // Clear all storage data
    await this.storage.clear();

    // Navigate to login page
    this.router.navigate(['/login']);
  }

  edit() {
    this.router.navigate(['/reg-aboutme']);
  }

  //upload resume functionality

  uploadedResumeName: string | null = null;
  uploadedResumeUrl: string | null = null;

  triggerFileUpload() {
    const fileInput = document.getElementById(
      'resumeUpload'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  // onFileSelected(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files[0]) {
  //     const file = input.files[0];

  //     // Check if it is a PDF
  //     if (file.type !== 'application/pdf') {
  //       console.error('Only PDF files are allowed.');
  //       return;
  //     }

  //     // Save file name
  //     this.uploadedResumeName = file.name;

  //     // Save a temporary URL to view the PDF
  //     this.uploadedResumeUrl = URL.createObjectURL(file);

  //     console.log('Selected file:', file);
  //   }
  // }
  uploadProgress: number | null = null;
  userId: any = localStorage.getItem('userId'); // or get dynamically from service/auth

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const userId = (await this.storage.get('userId')) || null;

    if (input.files && input.files[0] && userId) {
      this.uploadResume(input.files[0], userId).subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(
              (100 * event.loaded) / (event.total || 1)
            );
            this.getResume(); // Consider moving this to final response
          } else if (event.type === HttpEventType.Response) {
            this.showToast(
              event.body?.message || 'Upload completed',
              'success'
            );
          }
        },
        error: () => this.showToast('Upload failed', 'danger'),
      });
    }
  }

  uploadResume(file: File, userId: string): Observable<any> {
    return this.apiService.updateResume(userId, file).pipe(
      finalize(() => {
        this.uploadProgress = null;
      })
    );
  }

  ionViewWillEnter() {
    // this.getResume();
    this.getprofileData();
  }

  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom',
      color,
    });
    toast.present();
  }

  // openResume() {
  //   if (this.uploadedResumeUrl) {
  //     window.open(this.uploadedResumeUrl, '_blank');
  //   }
  // }

  goToAppliedSavedJobs() {
    this.router.navigate(['/applied-saved-jobs']);
  }
}
