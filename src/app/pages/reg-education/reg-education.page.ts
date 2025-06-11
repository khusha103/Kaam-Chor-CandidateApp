import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NavigationExtras, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastController } from '@ionic/angular';
import { StatusBar } from '@capacitor/status-bar';


@Component({
  selector: 'app-reg-education',
  templateUrl: './reg-education.page.html',
  styleUrls: ['./reg-education.page.scss'],
  providers: [DatePipe]
})
export class RegEducationPage {
  

  educationForm!: FormGroup;
  dataExists: boolean = false; // Flag to track if data exists

  constructor(private datePipe: DatePipe, private router:Router,private formBuilder: FormBuilder,private apiService: ApiService,private toastController: ToastController) {}
  qualification!: string;
  educationTitle!: string;
  branchOfStudy!: string;
  university!: string;
  passingYear: string | null = null; 
  // formPages: string[] = ['Aboutme', 'Education', 'Experience', 'Skills', 'Review'];
  formPages: string[] = ['Education', 'Experience', 'Skills', 'Review'];

  currentPage: number = 0;
  progress: number = 0;
  show_branch: boolean = false;
  show_edu_title: boolean = false;
  show_univ_name: boolean = false;
  show_passing_yr: boolean = false;

  qualifications: any[] = []; 
  educationTitles: any[] = []; 
  branches: any[] = []; 
  universities: any[] = []; 


  // qualifications = ['Less than 10th','10th','12th','Diploma','Graduate','Post Graduate']; // Sample qualifications
  // educationTitles = [
  //   'M.Com (Master of Commerce)',
  //   'B.Sc (Bachelor of Science)',
  //   'B.Tech (Bachelor of Technology)',
  // ]; // Sample education titles
  // branches = [
  //   'Science',
  //   'Commerce',
  //   'Arts',
  //   'Engineering',
  // ]; // Sample branches
  // universities = [
  //   'Maharana Pratap Horticultural University (MHU)',
  //   'University A',
  //   'University B',
  // ]; // Sample universities


  initializeForm() {
    this.educationForm = this.formBuilder.group({
      highest_qualification: ['', Validators.required], 
      title_of_education: [''], 
      branch_of_study: [''], 
      university_name: [''], 
      passing_year: [''] 
    });
    
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.apiService.getFormData('educationForm', userId).subscribe(
        (response) => {
          // console.log('Fetched data:', response); 
    
          if (response && response.status) {
            const data = response.data; 
    
            this.educationForm.patchValue({
              highest_qualification: data.highest_qualification || '', 
              title_of_education: data.title_of_education || '', 
              branch_of_study: data.branch_of_study || '', 
              university_name: data.university_name || '', 
              passing_year: data.passing_year || '' 
            });


            // Update flags for show fields accordingly
            this.show_passing_yr = data.passing_year !== "-";
            this.show_branch = data.branch_of_study !== "-";
            this.show_univ_name = data.university_name !== "-";
            this.show_edu_title = data.title_of_education !== "-";
    
            // console.log('Form patched with data:', this.educationForm.value);
            this.dataExists = true; 
          } else {
            // console.log('No data found for the specified key.');
            this.dataExists = false; 
          }
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    } else {
      console.error('User ID is not available in local storage.');
    }
  }

  ionViewWillEnter() {
    // StatusBar.setBackgroundColor({ color: '#511168' }); // match form tab color
    this.loadQuali(); 
    this.loadBranches();
    this.loadUniv();

     this.currentPage = 0;
     this.progress = 25;

    //  console.log(this.currentPage);
    //  console.log(this.progress);

     this.initializeForm();


    // this.loadedutitle();
    // console.log(QualId);
     // Listen for changes in the qualification dropdown
     this.educationForm.get('highest_qualification')?.valueChanges.subscribe(QualId => {
    // console.log(QualId);
    // when Qualid>=4 i.e. 4->diploma 5->graduate 6->post-graduate then fetch edutitles
      if (QualId >= 4) {
        this.load_edu_titles(QualId);
        // console.log("executed");
      } else {
        this.educationTitles = [];
      }
      this.educationForm.get('educationTitle')?.setValue('');
    });

    
  }

  ngOnInit() {
    // StatusBar.setBackgroundColor({ color: '#511168' }); // match form tab color
    this.loadQuali(); 
    this.loadBranches();
    this.loadUniv();

     this.currentPage = 0;
     this.progress = 25;

    //  console.log(this.currentPage);
    //  console.log(this.progress);

     this.initializeForm();


    // this.loadedutitle();
    // console.log(QualId);
     // Listen for changes in the qualification dropdown
     this.educationForm.get('highest_qualification')?.valueChanges.subscribe(QualId => {
    // console.log(QualId);
    // when Qualid>=4 i.e. 4->diploma 5->graduate 6->post-graduate then fetch edutitles
      if (QualId >= 4) {
        this.load_edu_titles(QualId);
        // console.log("executed");
      } else {
        this.educationTitles = [];
      }
      this.educationForm.get('educationTitle')?.setValue('');
    });

  }

  loadQuali(){
    this.apiService.getEduQual().subscribe(
      data => {
        // console.log('Qual loaded:', data); // Log the data
        this.qualifications = data;
      },
      error => console.error('Error loading Qual:', error)
    );
  }

  load_edu_titles(QualId: number){
    this.apiService.geteduTitlesByQual(QualId).subscribe(
      data => this.educationTitles = data,
      error => console.error('Error loading educationTitles:', error)
    );
  }

  loadBranches(){
    this.apiService.getEduBranch().subscribe(
      data => {
        // console.log('Branch loaded:', data); // Log the data
        this.branches = data;
      },
      error => console.error('Error loading Branches:', error)
    ); 
  }

  loadUniv(){
    this.apiService.getUnivName().subscribe(
      data => {
        // console.log('Univ loaded:', data); // Log the data
        this.universities = data;
      },
      error => console.error('Error loading University:', error)
    ); 
  }


  async onSubmit() {
    // console.log(this.educationForm.value); // Log the form values for debugging

    // Check if the education form is valid
    if (this.educationForm.valid) {
        // Retrieve user ID from localStorage and convert to number
        const userIdString = localStorage.getItem('userId');
        const userId = userIdString ? Number(userIdString) : null; // Convert to number or set to null

        // Check if user ID is available
        if (userId === null) {
            this.presentToast('User ID is not available. Please log in again.');
            return; // Exit if userId is null
        }

        try {
            // Fetch mobile number from the database using the user ID
            const mobileResponse = await this.apiService.getMobileNumberByUserId(userId).toPromise();
            const mobileNumber = mobileResponse.mobile_number; // Extract mobile number from response
            const form_key = "educationForm";

            // Prepare the data to be submitted, including user_id and mobile_number
            const educationData = {
                ...this.educationForm.value,
                user_id: userId,
                mobile_number: mobileNumber,
                form_key: form_key
                
            };

            // Submit the education data to the API
            const response = await this.apiService.submitEducation(educationData).toPromise();
            this.presentToast('Data saved successfully!'); // Show success message
            // console.log(response); // Log the response for debugging
            this.router.navigate(['/reg-experience']); // Navigate to the experience page
        } catch (error) {
            // Handle any errors during the API calls
            console.error('Error:', error);
            this.presentToast('Failed to submit data. Please try again.'); // Show error message
        }
    } else {
        // Handle case where the form is invalid
        this.presentToast('Please fill in all required fields correctly.'); // Prompt user to fix the form
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


  onDateChange(event: any) {
    const selectedDate = event.detail.value;
    console.log("format here for passing year");
    this.passingYear = selectedDate ? this.datePipe.transform(selectedDate, 'MMMM yyyy') : null;
    console.log(this.passingYear);
  }

  onselect_quali(event: any){
    // console.log(event.detail.value);
    const selected_qual:any = event.detail.value;

    //unset validators here
    this.educationForm.get('educationTitle')?.clearValidators();
    this.educationForm.get('branchOfStudy')?.clearValidators();
    this.educationForm.get('university')?.clearValidators();
    this.educationForm.get('passingYear')?.clearValidators();


    if(selected_qual=="1"){
      // console.log("none show ");
      this.show_passing_yr = false;
      this.show_branch = false;
      this.show_univ_name = false;
      this.show_edu_title = false;
    }else if(selected_qual=="2"){
     this.show_passing_yr = true;
     this.show_branch = false;
      this.show_univ_name = false;
      this.show_edu_title = false;
      this.educationForm.get('passingYear')?.setValidators([Validators.required]);
    }else if(selected_qual=="3"){
      this.show_edu_title = false;
      this.show_branch = true;
      this.show_univ_name = false;
      this.show_passing_yr = false;
      this.educationForm.get('branchOfStudy')?.setValidators([Validators.required]);
    }else if(selected_qual=="4"){
      this.show_edu_title = true;
      this.show_branch = false;
      this.show_univ_name = false;
      this.show_passing_yr = false;
      this.educationForm.get('educationTitle')?.setValidators([Validators.required]);
    }else if(selected_qual=="5"){
      this.show_edu_title = true;
      this.show_branch = false;
      this.show_univ_name = false;
      this.show_passing_yr = false;
      this.educationForm.get('educationTitle')?.setValidators([Validators.required]);
    }else if(selected_qual=="6"){
      this.show_edu_title = true;
      this.show_branch = false;
      this.show_univ_name = false;
      this.show_passing_yr = false;
      this.educationForm.get('educationTitle')?.setValidators([Validators.required]);
    }else{
     console.log("else case");
    }

    // Update the form control validators
  this.educationForm.get('educationTitle')?.updateValueAndValidity();
  this.educationForm.get('branchOfStudy')?.updateValueAndValidity();
  this.educationForm.get('university')?.updateValueAndValidity();
  this.educationForm.get('passingYear')?.updateValueAndValidity();

  }

  onselect_edu_title(event: any){
     //unset validators here
    this.educationForm.get('branchOfStudy')?.clearValidators();
    this.educationForm.get('university')?.clearValidators();
    this.educationForm.get('passingYear')?.clearValidators();

    // console.log(event.detail.value);
    this.show_branch = true;
    this.educationForm.get('branchOfStudy')?.setValidators([Validators.required]);

     // Update the form control validators
  this.educationForm.get('educationTitle')?.updateValueAndValidity();
  this.educationForm.get('branchOfStudy')?.updateValueAndValidity();
  this.educationForm.get('university')?.updateValueAndValidity();
  this.educationForm.get('passingYear')?.updateValueAndValidity();

  }

  onselect_branch(event: any){
     //unset validators here
    this.educationForm.get('university')?.clearValidators();
    this.educationForm.get('passingYear')?.clearValidators();

    // console.log(event.detail.value);
    this.show_univ_name = true;
    this.educationForm.get('university')?.setValidators([Validators.required]);

     // Update the form control validators
  this.educationForm.get('educationTitle')?.updateValueAndValidity();
  this.educationForm.get('branchOfStudy')?.updateValueAndValidity();
  this.educationForm.get('university')?.updateValueAndValidity();
  this.educationForm.get('passingYear')?.updateValueAndValidity();

  }

  onselect_univ(event: any){
     //unset validators here
    this.educationForm.get('passingYear')?.clearValidators();
    // console.log(event.detail.value);
    this.show_passing_yr = true;
    this.educationForm.get('passingYear')?.setValidators([Validators.required]);

     // Update the form control validators
  this.educationForm.get('educationTitle')?.updateValueAndValidity();
  this.educationForm.get('branchOfStudy')?.updateValueAndValidity();
  this.educationForm.get('university')?.updateValueAndValidity();
  this.educationForm.get('passingYear')?.updateValueAndValidity();

  }

  // onDateChange(event: any) {
  //   const date = new Date(this.selectedDate);
  //   this.formattedDate = this.datePipe.transform(date, 'MMMM yyyy');
  // }



  previousPage() {
    this.router.navigate(['/reg-aboutme']);
    // this.router.navigate(['/reg-aboutme'], { state: { reload: true } });
  }

 

  
  updateForm() {
    // Logic to update the existing form data
    if (this.educationForm.valid) {
      const userId = localStorage.getItem('userId');
      const formKey = 'educationForm'; // The key for the form
    if(userId){
      this.apiService.updateFormData(formKey, userId, this.educationForm.value).subscribe(
        (response) => {
          // console.log('Form updated successfully:', response);
          this.router.navigate(['/reg-experience']);
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
