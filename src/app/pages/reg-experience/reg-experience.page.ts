import { Component, OnInit } from '@angular/core';
// import { FormBuilder } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StatusBar } from '@capacitor/status-bar';
// import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-reg-experience',
  templateUrl: './reg-experience.page.html',
  styleUrls: ['./reg-experience.page.scss'],
})
export class RegExperiencePage implements OnInit {

  constructor(private router: Router,private formBuilder: FormBuilder,private apiService: ApiService,private toastController:ToastController) { }
  experienceForm!: FormGroup;
  dataExists: boolean = false; 
  
  currentPage: number = 0;
  progress: number = 0;
  expyes: boolean = false;
  industryTypes: any[] = []; 
  // formPages: string[] = ['Aboutme', 'Education', 'Experience', 'Skills', 'Review'];
  formPages: string[] = ['Education', 'Experience', 'Skills', 'Review'];

  initializeForm() {
    this.experienceForm = this.formBuilder.group({
      have_experience: ['No', Validators.required], 
      year_of_experience: [''], 
      currentpast_job_title: [''], 
      currentpast_company_name: [''], 
      monthly_salary: [''], 
      industry_type: [''] 
    });
    
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.apiService.getFormData('experienceForm', userId).subscribe(
        (response) => {
            // console.log('Fetched data:', response); // Log the entire response
    
            if (response && response.status) {
                const data = response.data; 
                // console.log('Data:', data); // Log the data object
    
                // Check if have_experience exists before accessing it
                if (data && data.have_experience !== undefined) {
                    this.experienceForm.patchValue({
                        have_experience: data.have_experience || '', 
                        year_of_experience: data.year_of_experience || '', 
                        currentpast_job_title: data.currentpast_job_title || '', 
                        currentpast_company_name: data.currentpast_company_name || '', 
                        monthly_salary: data.monthly_salary || '', 
                        industry_type: data.industry_type || '' 
                    });

                    if(data.have_experience == "Yes"){
                      this.expyes = true;
                    }
                } else {
                    console.warn('have_experience is not defined in the response data.');
                    // Handle the case where have_experience is not available
                    this.experienceForm.patchValue({
                        have_experience: 'No' // or any default value you want
                    });
                }
    
                // console.log('Form patched with data:', this.experienceForm.value);
                this.dataExists = true; // Set flag to true if data exists
            } else {
                console.log('No data found for the specified key.');
                this.dataExists = false; // Set flag to false if no data
            }
        },
        (error) => {
            console.error('Error fetching data:', error);
        }
    );
    } else {
      console.error('User ID is not available in local storage.');
      // Handle the case where userId is null, e.g., redirect to login
    }
  }

  ionViewWillEnter() {
     // StatusBar.setBackgroundColor({ color: '#511168' }); // match form tab color
    // console.error();
    this.load_industrytypes();
    this.currentPage = 1;
    this.progress = 50;
    // console.log(this.currentPage);
    // console.log(this.progress);

    this.initializeForm();

    // Log form value changes
    this.experienceForm.valueChanges.subscribe(val => {
      this.logFormValidity();
      // console.log('Form value changed:', val);
      // console.log('Form valid:', this.experienceForm.valid);
      // this.logFormValidity();
    });

  }
  ngOnInit() {
    // StatusBar.setBackgroundColor({ color: '#511168' }); // match form tab color
    // console.error();
    this.load_industrytypes();
    this.currentPage = 1;
    this.progress = 50;
    // console.log(this.currentPage);
    // console.log(this.progress);

    this.initializeForm();

    // Log form value changes
    this.experienceForm.valueChanges.subscribe(val => {
      this.logFormValidity();
      // console.log('Form value changed:', val);
      // console.log('Form valid:', this.experienceForm.valid);
      // this.logFormValidity();
    });

 }

 logFormValidity() {
  Object.keys(this.experienceForm.controls).forEach(key => {
    const control = this.experienceForm.get(key);
    if (control) {
      console.log(`${key} valid:`, control.valid, 'errors:', control.errors);
    } else {
      console.log(`Control ${key} not found in form`);
    }
  });
}

 load_industrytypes(){
  this.apiService.getIndustryType().subscribe(
    data => {
      // console.log('indutrytype loaded:', data); // Log the data
      this.industryTypes = data;
    },
    error => console.error('Error loading indutrytype:', error)
  );
 }
 

  async onSubmit() {
    if (this.experienceForm.valid) {
      const userIdString = localStorage.getItem('userId');
      const userId = userIdString ? Number(userIdString) : null; // Convert to number or set to null

      if (userId === null) {
          this.presentToast('User ID is not available. Please log in again.');
          return; // Exit if userId is null
      }
      
      try {

          const mobileResponse = await this.apiService.getMobileNumberByUserId(userId).toPromise();
          const mobileNumber = mobileResponse.mobile_number; 
          const form_key = "experienceForm";

          // Prepare the data to be submitted, including user_id and mobile_number
          const experienceData = {
              ...this.experienceForm.value,
              user_id: userId,
              mobile_number: mobileNumber,
              form_key: form_key
          };
        const response = await this.apiService.submitExperience(experienceData).toPromise();
        this.presentToast('Data saved successfully!');
        // console.log(response);
        // Navigate to the next page
        this.router.navigate(['/reg-skills']);
      } catch (error) {
        console.error('Error:', error);
        this.presentToast('Failed to submit data. Please try again.');
      }
    } else {
      this.presentToast('Please fill in all required fields correctly.');
    }
  }


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }


  previousPage() {
    this.router.navigate(['/reg-education']);
  }

  // onselect(event: any){
  //   // console.log("onslecte exp");
  //   console.log(event.detail.value);
    
    
  //   // if yes set flag show div else not show
  //   if(event.detail.value == "Yes"){
  //     this.expyes = true;

  //     // console.log('Validators after clearing:', this.experienceForm.get('totalYears')?.validator);

  //     // Set validators for experience fields
  //   // this.experienceForm.get('totalYears')?.setValidators([Validators.required]);
  //   this.experienceForm.get('totalYears')?.setValidators([Validators.required,Validators.min(1),Validators.max(30)]);
  //   this.experienceForm.get('jobTitle')?.setValidators([Validators.required]);
  //   this.experienceForm.get('companyName')?.setValidators([Validators.required]);
  //   this.experienceForm.get('monthlySalary')?.setValidators([Validators.required,Validators.min(1000)]);
  //   this.experienceForm.get('industryType')?.setValidators([Validators.required]);

  //   // console.log('Validators after clearing:', this.experienceForm.get('totalYears')?.validator);


  //   this.experienceForm.get('totalYears')?.updateValueAndValidity();
  //  this.experienceForm.get('jobTitle')?.updateValueAndValidity();
  //  this.experienceForm.get('companyName')?.updateValueAndValidity();
  //  this.experienceForm.get('monthlySalary')?.updateValueAndValidity();
  //  this.experienceForm.get('industryType')?.updateValueAndValidity();

  //  // Update the validity of the form group
  //  this.experienceForm.updateValueAndValidity();

  //   }else{
  //     this.expyes = false;
  //     console.log("else checkbox");
  //        //unset validators here
  //   // this.experienceForm.get('hasExperience')?.clearValidators();
  //   this.experienceForm.get('totalYears')?.clearValidators();
  //   this.experienceForm.get('jobTitle')?.clearValidators();
  //   this.experienceForm.get('companyName')?.clearValidators();
  //   this.experienceForm.get('monthlySalary')?.clearValidators();
  //   this.experienceForm.get('industryType')?.clearValidators();

  //   // / Empty the fields
  //   this.experienceForm.get('totalYears')?.reset();
  //   this.experienceForm.get('jobTitle')?.reset();
  //   this.experienceForm.get('companyName')?.reset();
  //   this.experienceForm.get('monthlySalary')?.reset();
  //   this.experienceForm.get('industryType')?.reset();



  //  // Update the form control validators
  // //  this.experienceForm.get('hasExperience')?.updateValueAndValidity();
  //  this.experienceForm.get('totalYears')?.updateValueAndValidity();
  //  this.experienceForm.get('jobTitle')?.updateValueAndValidity();
  //  this.experienceForm.get('companyName')?.updateValueAndValidity();
  //  this.experienceForm.get('monthlySalary')?.updateValueAndValidity();
  //  this.experienceForm.get('industryType')?.updateValueAndValidity();


  //  // Update the validity of the form group
  //  this.experienceForm.updateValueAndValidity();

  //   }
  // }

  onselect(event: any) {
    // console.log(event.detail.value);
    
    // If yes, set flag to show div else do not show
    if (event.detail.value === "Yes") {
        this.expyes = true;

        // Set validators for experience fields
        this.experienceForm.get('year_of_experience')?.setValidators([
            Validators.required,
            Validators.min(1),
            Validators.max(30)
        ]);
        this.experienceForm.get('currentpast_job_title')?.setValidators([Validators.required]);
        this.experienceForm.get('currentpast_company_name')?.setValidators([Validators.required]);
        this.experienceForm.get('monthly_salary')?.setValidators([
            Validators.required,
            Validators.min(1000)
        ]);
        this.experienceForm.get('industry_type')?.setValidators([Validators.required]);

        // Update the validity of each form control
        this.experienceForm.get('year_of_experience')?.updateValueAndValidity();
        this.experienceForm.get('currentpast_job_title')?.updateValueAndValidity();
        this.experienceForm.get('currentpast_company_name')?.updateValueAndValidity();
        this.experienceForm.get('monthly_salary')?.updateValueAndValidity();
        this.experienceForm.get('industry_type')?.updateValueAndValidity();

        // Update the validity of the form group
        this.experienceForm.updateValueAndValidity();

    } else {
        this.expyes = false;
        console.log("else checkbox");

        // Unset validators here
        this.experienceForm.get('year_of_experience')?.clearValidators();
        this.experienceForm.get('currentpast_job_title')?.clearValidators();
        this.experienceForm.get('currentpast_company_name')?.clearValidators();
        this.experienceForm.get('monthly_salary')?.clearValidators();
        this.experienceForm.get('industry_type')?.clearValidators();

        // Empty the fields
        this.experienceForm.get('year_of_experience')?.reset();
        this.experienceForm.get('currentpast_job_title')?.reset();
        this.experienceForm.get('currentpast_company_name')?.reset();
        this.experienceForm.get('monthly_salary')?.reset();
        this.experienceForm.get('industry_type')?.reset();

        // Update the validity of each form control
        this.experienceForm.get('year_of_experience')?.updateValueAndValidity();
        this.experienceForm.get('currentpast_job_title')?.updateValueAndValidity();
        this.experienceForm.get('currentpast_company_name')?.updateValueAndValidity();
        this.experienceForm.get('monthly_salary')?.updateValueAndValidity();
        this.experienceForm.get('industry_type')?.updateValueAndValidity();

        // Update the validity of the form group
        this.experienceForm.updateValueAndValidity();
    }
}

  updateForm() {
    // Logic to update the existing form data
    if (this.experienceForm.valid) {
      const userId = localStorage.getItem('userId');
      const formKey = 'experienceForm'; // The key for the form
    if(userId){
      this.apiService.updateFormData(formKey, userId, this.experienceForm.value).subscribe(
        (response) => {
          // console.log('Form updated successfully:', response);
          // this.router.navigate(['/reg-skills']);
          // Navigate to next page and replace the current one in history
          this.router.navigate(['/reg-skills'], { replaceUrl: true });
        },
        (error) => {
          console.error('Error updating form:', error);
          // Handle error response, e.g., show an error message
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }else{
    console.log("userid not found");
  }
  }


}
