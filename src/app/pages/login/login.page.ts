import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';
import { StatusBar, Style as StatusBarStyle } from '@capacitor/status-bar';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mobileNumber: string = '';
  username: string = '';
  acceptTerms: boolean = false;
  isLoading: boolean = false;
  isNewUser: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    StatusBar.setBackgroundColor({ color: '#ffffff' });
    StatusBar.setStyle({ style: StatusBarStyle.Dark });
  }

  retry() {
    window.location.reload();
  }

  validatePhoneNumber(event: any) {
    const input = event.target as HTMLIonInputElement;
    const value = input.value as string;
    const numericValue = value.replace(/\D/g, '');
    this.mobileNumber = numericValue.slice(0, 10);
    input.value = this.mobileNumber;
  }

  sendOtp() {
    if (this.mobileNumber.length === 10 && this.acceptTerms && !this.isLoading) {
      this.isLoading = true;
      console.log('Sending OTP to:', this.mobileNumber);

      this.authService.sendOtp(this.mobileNumber).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.username = response.data.name;
          this.isNewUser = response.data.flag_newuser === true;

          const navigationExtras: NavigationExtras = {
            state: {
              mobileNumber: this.mobileNumber,
              isNewUser: this.isNewUser,
              username: this.username,
            },
          };
          this.router.navigate(['/otp-verf'], navigationExtras);
        },
        error: (error: any) => {
          console.error('Error sending OTP', error);
          this.isLoading = false;
        },
      });
    } else {
      console.error('Invalid form submission or already processing');
    }
  }
}
