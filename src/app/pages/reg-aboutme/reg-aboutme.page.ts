// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { StatusBar } from '@capacitor/status-bar';
// import { ToastController } from '@ionic/angular';
// import { CalendarComponentOptions } from 'src/app/interfaces/calendar-options.interface';
// import { ApiService } from 'src/app/services/api.service';
// import { AuthService } from 'src/app/services/auth.service';
// import { Storage } from '@ionic/storage-angular';


// @Component({
//   selector: 'app-reg-aboutme',
//   templateUrl: './reg-aboutme.page.html',
//   styleUrls: ['./reg-aboutme.page.scss'],
// })
// export class RegAboutmePage implements OnInit {
//   name!: string;
//   email!: string;
//   mobileNumber!: string;
//   dob!: string;
//   gender!: string;
//   state!: string;
//   city!: string;
//   dataExists: boolean = false; // Flag to track if data exists

//   states: any[] = []; 
//   cities: any[] = []; 
  
//   aboutMeForm!: FormGroup;
//   selectedGender!: string;

//   calendarOptions: CalendarComponentOptions = {
//     pickMode: 'single',
//     title: 'Select a Date'
//   };
  
//   constructor(private router: Router,private formBuilder: FormBuilder,private apiService: ApiService,private authService:AuthService,private toastController: ToastController,private storage: Storage) { 
//       this.initStorage();
//   }

//    async initStorage() {
//     await this.storage.create();
//   }

//   ionViewWillEnter() {
//     this.initializeForm();
//     console.log("page 1 view call");
//     this.loadStates(); 

//      this.aboutMeForm.get('state')?.valueChanges.subscribe(stateId => {
//        if (stateId) {
//          this.loadCities(stateId);
//        } else {
//          this.cities = [];
//        }
//        this.aboutMeForm.get('city')?.setValue('');
//      });
//   }
//   ngOnInit() {
//     // StatusBar.setBackgroundColor({ color: '#ffffff' }); // match form tab color
//     this.initializeForm();
//     this.loadStates(); 

//     //  this.currentPage = 0;
//     //  this.progress = 20;

//     //  console.log(this.currentPage);
//     //  console.log(this.progress);

    

//     // Listen for changes in the state dropdown
//      this.aboutMeForm.get('state')?.valueChanges.subscribe(stateId => {
//        if (stateId) {
//          this.loadCities(stateId);
//        } else {
//          this.cities = [];
//        }
//        this.aboutMeForm.get('city')?.setValue('');
//      });
//   }

//   async initializeForm() {
//     // const userId = localStorage.getItem('userId');
//      const userId= await this.storage.get('userId') || null;
//     // console.log('Retrieved userId:', userId);
//     let mobi_by_userid = "";
// if (userId !== null) {
//   const userIdNumber = parseInt(userId, 10);

//   // console.log("userNumber",userIdNumber);
//   if (!isNaN(userIdNumber)) {
//     this.authService.getmb_byuserid(userIdNumber).subscribe({
//       next: (response) => {
//         // console.log('data receive here ', response);
//         // console.log('mobi',response.data[0].mobile_number);

//         let mobi_by_userid ='+91'+response.data[0].mobile_number;
//         this.updateMobileNumber(mobi_by_userid);
//       },
//       error: (error) => {
//         console.error('Error verifying OTP', error);
        
//       }
//     });
//   } else {
//     console.error('UserId is not a valid number');
//   }
// } else {
//   console.error('UserId not found in localStorage');
// }
   
//     this.aboutMeForm = this.formBuilder.group({
//       name: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       mobile_number: [mobi_by_userid],
//       dob: ['', Validators.required],
//       gender: ['', Validators.required], // Updated to match the database column
//       state: ['', Validators.required],
//       city: ['', Validators.required]
//     });


//     // const userId = localStorage.getItem('userId');
//     if (userId) {
//     this.apiService.getFormData('aboutMeForm', userId).subscribe(
//       (response) => {
//         // console.log('Fetched data:', response); 
    
//         if (response && response.status) {
//           const data = response.data; 
    
//           this.aboutMeForm.patchValue({
//             name: data.name || '',
//             email: data.email || '',
//             mobile_number: data.mobile_number || '', 
//             dob: data.dob || '',
//             gender: data.gender || '', 
//             state: data.state || '',
//             city: data.city || ''
//           });
    
//           // console.log('Form patched with data:', this.aboutMeForm.value);
//           this.dataExists = true; // Set flag to true if data exists
//         } else {
//           console.log('No data found for the specified key.');
//           this.dataExists = false; // Set flag to false if no data
//         }
//       },
//       (error) => {
//         console.error('Error fetching data:', error);
//       }
//     );
//   }else {
//     console.error('User ID is not available in local storage.');
//     // Handle the case where userId is null, e.g., redirect to login
//   }
//   }


// // update mobile number fetch by userid
// updateMobileNumber(mobileNumber: string) {
//   this.aboutMeForm.patchValue({
//     mobile_number: mobileNumber
//   });
// }
 
  

// loadStates() {
//   this.apiService.getStates().subscribe(
//     data => {
//       // console.log('States loaded:', data); // Log the data
//       this.states = data;
//     },
//     error => console.error('Error loading states:', error)
//   );
// }

//   loadCities(stateId: number) {
//     this.apiService.getCitiesByState(stateId).subscribe(
//       data => this.cities = data,
//       error => console.error('Error loading cities:', error)
//     );
//   }
//   onDateSelect(event: any) {
//     console.log('Calendar event:', JSON.stringify(event));
//     // Rest of the method...
//   }



//   async onSubmit() {
//     if (this.aboutMeForm.valid) {
//         //user ID from localStorage
//         // const userIdString = localStorage.getItem('userId');
//         const userId= await this.storage.get('userId') || null;

//         // const userId = userIdString ? Number(userIdString) : null; 

//         if (userId === null) {
//             this.presentToast('User ID is not available. Please log in again.');
//             return; 
//         }

//         try {
//             // Fetch mobile number from the database using the user ID
//             const mobileResponse = await this.apiService.getMobileNumberByUserId(userId).toPromise();
//             const mobileNumber = mobileResponse.mobile_number; 
//             const formprogress = "20%";
//             const form_key = "aboutMeForm";

//             //including user_id and mobile_number
//             const aboutMeData = {
//                 ...this.aboutMeForm.value,
//                 user_id: userId,
//                 mobile_number: mobileNumber,
//                 form_progress: formprogress,
//                 form_key: form_key
//             };

//             // Submit the About Me data to the API
//             const response = await this.apiService.submitAboutMe(aboutMeData).toPromise();
//             this.presentToast('Data saved successfully!'); 
//             // console.log(response); 
//             this.router.navigate(['/reg-education']); 
//         } catch (error) {
            
//             console.error('Error:', error);
//             this.presentToast('Failed to submit data. Please try again.');
//         }
//     } else {
        
//         this.presentToast('Please fill in all required fields correctly.');
//     }
// }

//   async presentToast(message: string) {
//     const toast = await this.toastController.create({
//       message: message,
//       duration: 2000,
//       position: 'top'
//     });
//     toast.present();
//   }


//   async updateForm() {
//     // Logic to update the existing form data
//     if (this.aboutMeForm.valid) {
//       // const userId = localStorage.getItem('userId');
//      const userId= await this.storage.get('userId') || null;

//       const formKey = 'aboutMeForm'; // The key for the form
//     if(userId){
//       this.apiService.updateFormData(formKey, userId, this.aboutMeForm.value).subscribe(
//         (response) => {
//           // console.log('Form updated successfully:', response);
//           // Handle success response, e.g., show a success message or navigate
//           // this.router.navigate(['/reg-education']); 
//           // Navigate to next page and replace the current one in history
//           this.router.navigate(['/reg-education'], { replaceUrl: true });
//         },
//         (error) => {
//           console.error('Error updating form:', error);
//           // Handle error response, e.g., show an error message
//         }
//       );
//     } else {
//       console.error('Form is invalid');
//     }
//   }else{
//     console.log("userid not found");
//   }
//   }


// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StatusBar } from '@capacitor/status-bar';
import { ToastController } from '@ionic/angular';
import { CalendarComponentOptions } from 'src/app/interfaces/calendar-options.interface';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-reg-aboutme',
  templateUrl: './reg-aboutme.page.html',
  styleUrls: ['./reg-aboutme.page.scss'],
})
export class RegAboutmePage implements OnInit {
  aboutMeForm!: FormGroup;
  dataExists: boolean = false;
  states: any[] = [];
  cities: any[] = [];
  selectedGender!: string;

  calendarOptions: CalendarComponentOptions = {
    pickMode: 'single',
    title: 'Select a Date',
  };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private toastController: ToastController,
    private storage: Storage
  ) {
    this.storage.create(); // Initialize storage in constructor
    this.initializeForm(); // Initialize form synchronously
  }

  async ngOnInit() {
    // Load states and set up state change listener
    this.loadStates();
    this.setupStateChangeListener();
    await this.loadUserData();
  }

  initializeForm() {
    this.aboutMeForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile_number: [''],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  async loadUserData() {
    const userId = await this.storage.get('userId');
    if (!userId) {
      console.error('UserId not found in storage');
      this.presentToast('Please log in again.');
      return;
    }

    // Fetch mobile number
    this.authService.getmb_byuserid(Number(userId)).subscribe({
      next: (response) => {
        const mobileNumber = response.data[0]?.mobile_number
          ? '+91' + response.data[0].mobile_number
          : '';
        this.aboutMeForm.patchValue({ mobile_number: mobileNumber });
      },
      error: (error) => {
        console.error('Error fetching mobile number:', error);
      },
    });

    // Fetch existing form data
    this.apiService.getFormData('aboutMeForm', userId).subscribe({
      next: (response) => {
        if (response && response.status && response.data) {
          this.aboutMeForm.patchValue({
            name: response.data.name || '',
            email: response.data.email || '',
            mobile_number: response.data.mobile_number || '',
            dob: response.data.dob || '',
            gender: response.data.gender || '',
            state: response.data.state || '',
            city: response.data.city || '',
          });
          this.dataExists = true;
        } else {
          this.dataExists = false;
        }
      },
      error: (error) => {
        console.error('Error fetching form data:', error);
        this.dataExists = false;
      },
    });
  }

  setupStateChangeListener() {
    this.aboutMeForm.get('state')?.valueChanges.subscribe((stateId) => {
      if (stateId) {
        this.loadCities(stateId);
      } else {
        this.cities = [];
        this.aboutMeForm.get('city')?.setValue('');
      }
    });
  }

  loadStates() {
    this.apiService.getStates().subscribe({
      next: (data) => {
        this.states = data;
      },
      error: (error) => console.error('Error loading states:', error),
    });
  }

  loadCities(stateId: number) {
    this.apiService.getCitiesByState(stateId).subscribe({
      next: (data) => {
        this.cities = data;
      },
      error: (error) => console.error('Error loading cities:', error),
    });
  }

  // async onSubmit() {
  //   if (this.aboutMeForm.valid) {
  //     const userId = await this.storage.get('userId');
  //     if (!userId) {
  //       this.presentToast('User ID is not available. Please log in again.');
  //       return;
  //     }

  //     try {
  //       const mobileResponse = await this.apiService.getMobileNumberByUserId(userId).toPromise();
  //       const mobileNumber = mobileResponse.mobile_number;
  //       const aboutMeData = {
  //         ...this.aboutMeForm.value,
  //         user_id: userId,
  //         mobile_number: mobileNumber,
  //         form_progress: '20%',
  //         form_key: 'aboutMeForm',
  //       };

  //       await this.apiService.submitAboutMe(aboutMeData).toPromise();
  //       this.presentToast('Data saved successfully!');
  //       this.router.navigate(['/reg-education']);
  //     } catch (error) {
  //       console.error('Error submitting data:', error);
  //       this.presentToast('Failed to submit data. Please try again.');
  //     }
  //   } else {
  //     this.presentToast('Please fill in all required fields correctly.');
  //   }
  // }

 async onSubmit() {
  if (this.aboutMeForm.valid) {
    const userId = await this.storage.get('userId');
    if (!userId) {
      this.presentToast('User ID is not available. Please log in again.');
      return;
    }

    try {
      const mobileResponse = await this.apiService.getMobileNumberByUserId(userId).toPromise();
      const mobileNumber = mobileResponse.mobile_number;
      const aboutMeData = {
        ...this.aboutMeForm.value,
        user_id: userId,
        mobile_number: mobileNumber,
        form_progress: '20%',
        form_key: 'aboutMeForm',
      };

      const response = await this.apiService.submitAboutMe(aboutMeData).toPromise();
      this.presentToast('Data saved successfully!');
      this.router.navigate(['/reg-education']);
    } catch (error: any) {
      console.error('Error submitting data:', error);
      if (error?.error?.status === 'error' && error?.error?.message) {
        this.presentToast(error.error.message); // e.g., "Email already exists."
      } else {
        this.presentToast('Failed to submit data. Please try again.');
      }
    }
  } else {
    this.presentToast('Please fill in all required fields correctly.');
  }
}

  async updateForm() {
    if (this.aboutMeForm.valid) {
      const userId = await this.storage.get('userId');
      if (!userId) {
        this.presentToast('User ID is not available. Please log in again.');
        return;
      }

      this.apiService.updateFormData('aboutMeForm', userId, this.aboutMeForm.value).subscribe({
        next: () => {
          this.presentToast('Form updated successfully!');
          this.router.navigate(['/reg-education'], { replaceUrl: true });
        },
        error: (error) => {
          console.error('Error updating form:', error);
          this.presentToast('Failed to update form. Please try again.');
        },
      });
    } else {
      this.presentToast('Please fill in all required fields correctly.');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }
}