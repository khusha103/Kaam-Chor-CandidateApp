import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Network } from '@capacitor/network';
import { AlertController, NavController } from '@ionic/angular';
import { StatusBar,Style as StatusBarStyle } from '@capacitor/status-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mobileNumber: string = '';
  username: string = '';
  acceptTerms: boolean = false;
  isLoading: boolean = false;
  isNewUser: boolean = false;
  offline: boolean = false;

  constructor(private router: Router, private authService: AuthService,private alertController: AlertController,private navCtrl: NavController) { }

  ngOnInit() {
    StatusBar.setBackgroundColor({ color: '#ffffff' }); // white
      // Set the status bar style to dark (black text/icons)
      StatusBar.setStyle({ style: StatusBarStyle.Dark });
      
    Network.addListener('networkStatusChange', status => {
      if (!status.connected) {
        this.showAlert('You are offline. Please check your internet connection.');
      }
    });

    this.checkNetworkStatus();
  }

  async checkNetworkStatus() {
    const status = await Network.getStatus();
    if (!status.connected) {
      this.showAlert('You are offline. Please check your internet connection.');
    }
  }

  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Network Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();

    this.offline = true;
  }

  retry() {
    window.location.reload();
  }



  validatePhoneNumber(event: any) {
    const input = event.target as HTMLIonInputElement;
    const value = input.value as string;

    // Remove any non-digit characters
    const numericValue = value.replace(/\D/g, '');

    // Limit to 10 digits
    this.mobileNumber = numericValue.slice(0, 10);

    // Update the input value
    input.value = this.mobileNumber;
  }

 
  sendOtp() {
    if (this.mobileNumber.length === 10 && this.acceptTerms && !this.isLoading) {
      this.isLoading = true;
      console.log('Sending OTP to:', this.mobileNumber);

      this.authService.sendOtp(this.mobileNumber).subscribe({
        next: (response) => {
          console.log('OTP sent successfully', response);
          this.isLoading = false;
          console.log(response.data.name);
          this.username = response.data.name;

          // Convert the string 'true'/'false' to a boolean
        if(response.data.flag_newuser === true){
          this.isNewUser = true;
        }else{
          this.isNewUser = false;
        }
        // console.log(isNewUser);

          const navigationExtras: NavigationExtras = {
            state: {
              mobileNumber: this.mobileNumber,
              isNewUser: this.isNewUser,
              username: this.username
            }
          };

          this.router.navigate(['/otp-verf'], navigationExtras);
        },
        error: (error) => {
          console.error('Error sending OTP', error);
          this.isLoading = false;
          // Handle error (e.g., show error message to user)
          // You might want to use a toast or alert to inform the user
        }
      });
    } else {
      console.error('Invalid form submission or already processing');
      // Optionally, inform the user about the invalid submission
    }
  }



}
