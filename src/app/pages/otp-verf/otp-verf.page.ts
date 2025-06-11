import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StatusBar,Style as StatusBarStyle } from '@capacitor/status-bar';
import { NavController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';


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
  // isNewUser: boolean | undefined;

  constructor(private navCtrl: NavController, private platform: Platform,private router: Router,private route: ActivatedRoute,private authService: AuthService) { }

  ngOnInit() {
    StatusBar.setBackgroundColor({ color: '#ffffff' }); // white
      // Set the status bar style to dark (black text/icons)
      StatusBar.setStyle({ style: StatusBarStyle.Dark });
    // console.log(this.isNewUser);
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.mobileNumber = navigation.extras.state['mobileNumber'];
      this.isNewUser = navigation.extras.state['isNewUser'];
      this.username = navigation.extras.state['username'];
    }
  }

  submitOtp(){
    console.log('Attempting navigation to /tabs/home');
  this.router.navigate(['/tabs/home']).then(
    () => console.log('Navigation successful'),
    (err) => console.error('Navigation failed', err)
  );
  }

  verifyOtp() {
    if (this.otp.length === 4 && !this.isLoading) {
      this.isLoading = true;
      console.log('Verifying OTP:', this.otp);

      this.authService.verifyOtp(this.mobileNumber, this.otp).subscribe({
        next: (response) => {
          console.log('OTP verified successfully', response);
          this.isLoading = false;

          //set localstorage is loggedin 
          // Set localStorage indicator for login
          console.log('userid',response.data.user_id);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userId', response.data.user_id.toString());

        //   this.formDataService.getFormData(this.userId).subscribe(data => {
        //     this.formDataService.setFormData(data); // Prefill the form data
        //     this.router.navigate(['/step-one']); // Navigate to the first step
        // });

          const navigationExtras: NavigationExtras = {
            state: {
              verified: true
            }
          };

          // this.router.navigate(['/home'], navigationExtras); // Adjust the route as needed
          if(this.isNewUser){
            this.router.navigate(['/reg-aboutme'], navigationExtras);
          }else{
            this.router.navigate(['/tabs/home'], navigationExtras);
          }
         
        },
        error: (error) => {
          console.error('Error verifying OTP', error);
          this.isLoading = false;
          console.log(error.error.data.message);
          // Handle error (e.g., show error message to user)
          // You might want to use a toast or alert to inform the user
        }
      });
    } else {
      console.error('Invalid OTP or already processing');
      // Optionally, inform the user about the invalid submission
    }
  }

  goBack(){
    this.navCtrl.back();
    //handle hardware back button navigation
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.back();
    });
  }


  

}
