
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StatusBar, Style as StatusBarStyle } from '@capacitor/status-bar';
import { NavController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage-angular'; // Import Ionic Storage

@Component({
  selector: 'app-otp-verf',
  templateUrl: './otp-verf.page.html',
  styleUrls: ['./otp-verf.page.scss'],
})
export class OtpVerfPage implements OnInit {
  mobileNumber: string = '';
  otp: string = '';
  username: string = '';
  isLoading: boolean = false;
  isNewUser: boolean = false;

  constructor(
    private navCtrl: NavController,
    private platform: Platform,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private storage: Storage // Inject Ionic Storage
  ) {
    // Initialize Ionic Storage
    this.initStorage();
  }

  async initStorage() {
    // Create storage instance
    await this.storage.create();
  }

  ngOnInit() {
    StatusBar.setBackgroundColor({ color: '#ffffff' });
    StatusBar.setStyle({ style: StatusBarStyle.Dark });

    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.mobileNumber = navigation.extras.state['mobileNumber'];
      this.isNewUser = navigation.extras.state['isNewUser'];
      this.username = navigation.extras.state['username'];
    }
  }

  submitOtp() {
    console.log('Attempting navigation to /tabs/home');
    this.router.navigate(['/tabs/home']).then(
      () => console.log('Navigation successful'),
      (err) => console.error('Navigation failed', err)
    );
  }

  async verifyOtp() {
    if (this.otp.length === 4 && !this.isLoading) {
      this.isLoading = true;
      console.log('Verifying OTP:', this.otp);

      this.authService.verifyOtp(this.mobileNumber, this.otp).subscribe({
        next: async (response) => {
          console.log('OTP verified successfully', response);
          this.isLoading = false;

          // Store isLoggedIn and userId using Ionic Storage
          await this.storage.set('isLoggedIn', true);
          await this.storage.set('userId', response.data.user_id.toString());

          const navigationExtras: NavigationExtras = {
            state: {
              verified: true,
            },
          };

          if (this.isNewUser) {
            this.router.navigate(['/reg-aboutme'], navigationExtras);
          } else {
            this.router.navigate(['/tabs/home'], navigationExtras);
          }
        },
        error: (error) => {
          console.error('Error verifying OTP', error);
          this.isLoading = false;
          console.log(error.error.data.message);
          // Handle error (e.g., show error message to user)
        },
      });
    } else {
      console.error('Invalid OTP or already processing');
    }
  }

  goBack() {
    this.navCtrl.back();
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.back();
    });
  }
}