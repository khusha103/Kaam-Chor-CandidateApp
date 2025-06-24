import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.page.html',
  styleUrls: ['./job-detail.page.scss'],
})
export class JobDetailPage implements OnInit {
  activeButton: string = 'description';
  jobDetail: any;
  jobId: string = '';
  userId: string = '';

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private toastController: ToastController,
    private alertController: AlertController,
    private storage: Storage
  ) {
     this.initStorage();
  }

   async initStorage() {
    await this.storage.create();
  }

  async ngOnInit() {
    // this.userId = localStorage.getItem('userId') || '';
      this.userId= await this.storage.get('userId') || null;
    console.log('Retrieved userId:', this.userId);
    this.jobId = this.route.snapshot.paramMap.get('id') || '';
    if (this.jobId) {
      this.fetchJobDetail();
    }
  }

  setActiveButton(button: string) {
    this.activeButton = button;
  }

  fetchJobDetail() {
    this.apiService.getJobDetail(this.jobId).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.jobDetail = res.data;
        }
      },
      error: (err) => console.error('API Error:', err),
    });
  }

  getLanguageList(): string {
    if (!this.jobDetail || !this.jobDetail.job_languages) return '';
    const uniqueLanguages = new Set(
      this.jobDetail.job_languages.map((lang: { language: any }) => lang.language)
    );
    return Array.from(uniqueLanguages).join(', ');
  }

  async applyForJob() {
    if (!this.userId || !this.jobId) {
      await this.showAlert('Error', 'User ID or Job ID is missing');
      return;
    }

    const confirmAlert = await this.alertController.create({
      header: 'Confirm Application',
      message: 'Are you sure you want to apply for this job?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Apply',
          handler: () => {
            const applicationData = {
              userId: this.userId,
              jobId: this.jobId,
            };

            this.apiService.applyForJob(applicationData).subscribe({
              next: async (res: any) => {
                if (res.status) {
                  await this.showAlert('Success', res.message || 'Application submitted successfully!');
                } else {
                  await this.showAlert('Alert', res.message || 'Application failed');
                }
              },
              error: async (err) => {
                await this.showAlert('Alert', err.error?.message || 'An error occurred while applying');
                console.error('API Error:', err);
              },
            });
          },
        },
      ],
    });

    await confirmAlert.present();
  }

  async saveForJob() {
    if (!this.userId || !this.jobId) {
      await this.showAlert('Error', 'User ID or Job ID is missing');
      return;
    }

    const confirmAlert = await this.alertController.create({
      header: 'Confirm Save',
      message: 'Are you sure you want to save this job?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Save',
          handler: () => {
            const applicationData = {
              userId: this.userId,
              jobId: this.jobId,
            };

            this.apiService.saveForJob(applicationData).subscribe({
              next: async (res: any) => {
                if (res.status) {
                  await this.showAlert('Success', res.message || 'Job saved successfully!');
                } else {
                  await this.showAlert('Alert', res.message || 'Failed to save job');
                }
              },
              error: async (err) => {
                await this.showAlert('Alert', err.error?.message || 'An error occurred while saving');
                console.error('API Error:', err);
              },
            });
          },
        },
      ],
    });

    await confirmAlert.present();
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom',
    });
    await toast.present();
  }
}