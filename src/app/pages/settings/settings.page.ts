import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/services/api.service';
// import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  emailForm: FormGroup;
  isEditingEmail = false;
  currentEmail = '';
  userId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: ApiService,
    private toastController: ToastController,
    private storage: Storage
  ) {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async ngOnInit() {
    await this.initStorage();
    await this.fetchUserId();
    if (this.userId) {
      await this.fetchEmail();
    } else {
      this.presentToast('User ID not found', 'danger');
    }
  }

  private async initStorage() {
    await this.storage.create();
  }

  private async fetchUserId() {
    this.userId = await this.storage.get('userId');
  }

  async fetchEmail() {
    try {
      const response = await this.userService.getEmailByUserId(this.userId!).toPromise();
      if (response.status && response.data.email) {
        this.currentEmail = response.data.email;
        this.emailForm.patchValue({ email: this.currentEmail });
      } else {
        this.presentToast('Failed to fetch email', 'danger');
      }
    } catch (error) {
      this.presentToast('Error fetching email', 'danger');
    }
  }

  toggleEmailEdit() {
    this.isEditingEmail = !this.isEditingEmail;
    if (!this.isEditingEmail) {
      this.emailForm.patchValue({ email: this.currentEmail });
    }
  }

  async updateEmail() {
    if (this.emailForm.valid && this.userId) {
      const payload = {
        user_id: this.userId,
        email: this.emailForm.value.email,
      };

      try {
        const response = await this.userService.updateEmail(payload).toPromise();
        if (response.status) {
          this.currentEmail = this.emailForm.value.email;
          this.isEditingEmail = false;
          this.presentToast('Email updated successfully', 'success');
        } else {
          this.presentToast('Failed to update email', 'danger');
        }
      } catch (error) {
        this.presentToast('Error updating email', 'danger');
      }
    } else {
      this.presentToast('Invalid form or user ID', 'danger');
    }
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