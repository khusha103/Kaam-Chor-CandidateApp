import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StatusBar } from '@capacitor/status-bar';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-reg-skills',
  templateUrl: './reg-skills.page.html',
  styleUrls: ['./reg-skills.page.scss'],
})
export class RegSkillsPage implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private apiService: ApiService, private toastController: ToastController) { }
  skillsForm!: FormGroup;
  languageForm!: FormGroup;
  showOtherState: boolean = false;
  isdeleteLoading: boolean = false;
  maxStates: number = 5;
  // formPages: string[] = ['Aboutme', 'Education', 'Experience', 'Skills', 'Review'];
  formPages: string[] = ['Education', 'Experience', 'Skills', 'Review'];
  currentPage: number = 0;
  progress: number = 0;
  dataExists: boolean = false; // Flag to track if data exists


  // languageOptions  = ['English', 'Spanish', 'French', 'German', 'Mandarin'];
  // proficiencies = ['Beginner', 'Intermediate', 'Advanced', 'Native'];
  // states = ['State 1', 'State 2', 'State 3']; 

  languageOptions: any[] = [];
  proficiencies: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  skills: any[] = [];
  selectedFile: File | null = null;
  uploadedResumeName: string | null = null;
  uploadedResumeUrl: string | null = null;


  ionViewWillEnter() {
    // StatusBar.setBackgroundColor({ color: '#511168' }); // match form tab color
    //  this.initialize_nextvisit();

    this.loadskills();
    this.loadStates();
    this.loadlang();
    this.loadlangprof();
    this.getResume();


    this.currentPage = 2;
    this.progress = 75;

    console.log(this.currentPage);
    console.log(this.progress);

    //  this.addLanguage(); // Add initial language form


    this.skillsForm.get('anywhereInIndia')?.valueChanges.subscribe(value => {
      if (value) {
        this.skillsForm.patchValue({
          withinCity: false,
          otherState: false,
          job_states: []
        });
      }
    });

    this.skillsForm.get('otherState')?.valueChanges.subscribe(value => {
      if (!value) {
        this.skillsForm.patchValue({
          job_states: []
        });
      }
    });


  }
  ngOnInit() {
    // StatusBar.setBackgroundColor({ color: '#511168' }); // match form tab color
    this.initializeForm();

    this.loadskills();
    this.loadStates();
    this.loadlang();
    this.loadlangprof();


    this.currentPage = 2;
    this.progress = 75;

    console.log(this.currentPage);
    console.log(this.progress);

    //  this.addLanguage(); // Add initial language form


    this.skillsForm.get('anywhereInIndia')?.valueChanges.subscribe(value => {
      if (value) {
        this.skillsForm.patchValue({
          withinCity: false,
          otherState: false,
          job_states: []
        });
      }
    });

    this.skillsForm.get('otherState')?.valueChanges.subscribe(value => {
      if (!value) {
        this.skillsForm.patchValue({
          job_states: []
        });
      }
    });

    // Log form value changes
    this.skillsForm.valueChanges.subscribe(val => {
      this.logFormValidity();
      console.log('Form value changed:', val);
      console.log('Form valid:', this.skillsForm.valid);
      // this.logFormValidity();
    });




    // Filter out any empty entries of languages array 
    const languagesArray = this.skillsForm.get('languages') as FormArray;
    languagesArray.controls = languagesArray.controls.filter(control => {
      const langGroup = control.value;
      console.log("lang group", ((langGroup.rws && langGroup.rws.length > 0))); // Log the entire langGroup for debugging

      // Check if language is a non-empty string, proficiency is non-empty, or rws has elements
      return (typeof langGroup.language === 'string' && langGroup.language.trim() !== '') ||
        (typeof langGroup.proficiency === 'string' && langGroup.proficiency.trim() !== '') ||
        (langGroup.rws && langGroup.rws.length > 0);
    });
  }




  initialize_nextvisit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.apiService.getFormData('skillsForm', userId).subscribe(
        (response) => {
          // console.log('Fetched data:', response);

          if (response && response.status) {
            this.dataExists = true;
          }
        }
      );
    }
  }

  getResume() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.apiService.getResume(+userId).subscribe({
        next: (res) => {
          if (res.status && res.resume_url) {
            this.uploadedResumeUrl = res.resume_url;
          } else {
            this.uploadedResumeUrl = null;
          }
        },
        error: () => {
          this.uploadedResumeUrl = null;
        }
      });
    }
  }

  initializeForm() {
    this.skillsForm = this.formBuilder.group({
      // skills: [["1","2"], Validators.required],
      skills: [[], Validators.required],
      employment_type: ['', Validators.required],
      upload_resume: [null],
      languages: this.formBuilder.array([], Validators.required),
      workLocation: [[], Validators.required],
      job_states: [[]]
    });

    const userId = localStorage.getItem('userId');
    if (userId) {
      this.apiService.getFormData('skillsForm', userId).subscribe(
        (response) => {
          // console.log('Fetched data:', response);

          if (response && response.status) {
            const data = response.data;
            if (data && data.skills !== undefined) {
              // loc_anywhere: "0"
              // loc_mycity: "1"
              // loc_states: "1,2,3,4,9"

              // workLocation:
              // 0
              // : 
              // "otherState"
              // 1
              // : 
              // "withinCity"

              //set value of worklocation on basic of above loc_anywhere, loc_mycity, loc_states
              // if workLocation includes value otherstate, withincity,anywhere accroding to nonzero values of above three data i.e. loc_anywhere loc_mycity, loc_states


              const loc_checkbox: string[] = [];

              // Check conditions for workLocation
              if (data.loc_anywhere === "1") {
                loc_checkbox.push("anywhere");
              }
              if (data.loc_mycity === "1") {
                loc_checkbox.push("withinCity");
              }
              if (data.loc_states && data.loc_states.length > 0) {
                loc_checkbox.push("otherState");
              }

              // Check if 'otherState' is included in the loc_checkbox then change value of flag
              this.showOtherState = loc_checkbox.includes('otherState');

              this.skillsForm.patchValue({
                skills: data.skills.split(',').map(String) || [],
                workLocation: loc_checkbox,

                employment_type: data.employment_type || '',
                upload_resume: data.upload_resume || null,
                job_states: data.loc_states.split(',').map(String) || []
              });
              // console.log('Form patched with data:', this.skillsForm.value);
            } else {
              console.warn('skills is not defined in the response data.');
              this.skillsForm.patchValue({
                skills: [],
                employment_type: '',
                upload_resume: null,
                job_states: []
              });
            }

            // Patch languages if they exist
            if (data.languages && data.languages.length) {
              const languagesArray = this.skillsForm.get('languages') as FormArray;

              data.languages.forEach((lang: { language: any; proficiency: any; rws: any; }) => {
                // Check if language entry has valid properties
                if (lang.language && lang.proficiency) {
                  // Convert rws to an array if it's a string
                  const rwsArray = typeof lang.rws === 'string' ? lang.rws.split(',').map(item => item.trim()) : lang.rws;

                  languagesArray.push(this.formBuilder.group({
                    language: [lang.language || ''],
                    proficiency: [lang.proficiency || ''],
                    rws: [rwsArray || []]
                  }));
                }
              });

              // console.log('Form patched with lang data if exist:', this.skillsForm.value);
              this.dataExists = true; // Set flag to true if data exists
              // console.log('languagesArray', data.languages);
            }

          }
        },
        (error) => {
          console.error('Error fetching data:', error);
          this.dataExists = false; // Set flag to false if data not exists
        }
      );
    } else {
      console.error('User ID is not available in local storage.');
      // Handle the case where userId is null, e.g., redirect to login
    }

    this.addLanguage(); // Initialize with one language field

    // Add a listener to the job_states control
    this.skillsForm.get('job_states')!.valueChanges.subscribe((selectedStates: string[]) => {
      if (selectedStates && selectedStates.length > this.maxStates) {
        const limitedStates = selectedStates.slice(0, this.maxStates);
        this.skillsForm.get('job_states')!.setValue(limitedStates, { emitEvent: false });
      }
    });
    // this.logFormValidity();
  }


  // Method to remove empty language entries
  removeEmptyLanguages() {
    const languagesArray = this.skillsForm.get('languages') as FormArray;
    // Filter out any empty entries
    languagesArray.controls = languagesArray.controls.filter(control => {
      const langGroup = control.value;
      return langGroup.language || langGroup.proficiency || langGroup.rws.length > 0;
    });
  }


  // get isSkillSelected(): (skillId: number) => boolean {
  //   return (skillId: number) => {
  //     const selectedSkills = this.skillsForm.get('skills')?.value || [];
  //     return selectedSkills.includes(skillId);
  //   };
  // }

  // isSkillSelected(skillId: number): boolean {
  //   console.log("skillId is :" + skillId + this.skillsForm.get('skills')?.value?.includes(skillId));
  //   return this.skillsForm.get('skills')?.value?.includes(skillId);
  // }

  logFormValidity() {
    Object.keys(this.skillsForm.controls).forEach(key => {
      const control = this.skillsForm.get(key);
      if (control) {
        console.log(`${key} valid:`, control.valid, 'errors:', control.errors);
      } else {
        console.log(`Control ${key} not found in form`);
      }
    });

    console.log(this.skillsForm.value);
  }


  loadskills() {
    this.apiService.getSkills().subscribe(
      data => {
        // console.log('skills loaded:', data); // Log the data
        this.skills = data;
      },
      error => console.error('Error loading skills:', error)
    );
  }

  loadStates() {
    this.apiService.getStates().subscribe(
      data => {
        // console.log('States loaded:', data); // Log the data
        this.states = data;
      },
      error => console.error('Error loading states:', error)
    );
  }


  loadlang() {
    this.apiService.getLanguages().subscribe(
      data => {
        // console.log('lang loaded:', data); // Log the data
        this.languageOptions = data;
      },
      error => console.error('Error loading lang:', error)
    );
  }

  loadlangprof() {
    this.apiService.getLangProficiency().subscribe(
      data => {
        // console.log('LangProf loaded:', data); // Log the data
        this.proficiencies = data;
      },
      error => console.error('Error loading langprof:', error)
    );
  }


  async onSubmit() {
    // Check if the skills form is valid
    if (this.skillsForm.valid) {
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
        const user_id_intryblock: string = userId.toString();;
        const mobileNumber = mobileResponse.mobile_number; // Extract mobile number from response
        const form_key = "skillsForm";

        // Prepare the data to be submitted, including user_id and mobile_number
        // const skillsData = {
        //   ...this.skillsForm.value,
        //   user_id: userId,
        //   mobile_number: mobileNumber,
        //   form_key: form_key,
        //   // upload_resume : this.uploadFile
        // };

        const formData = new FormData();
        formData.append('file', this.skillsForm.get('upload_resume')?.value); // Use optional chaining

        // Adding a constant value
        const additionalValue = 'someConstantValue';
        formData.append('user_id', user_id_intryblock);
        formData.append('mobile_number', mobileNumber);
        formData.append('form_key', form_key);
        // formData.append('skillsformData', this.skillsForm.value);
        // Append form values to FormData
        // Append form values to FormData
        Object.keys(this.skillsForm.value).forEach(key => {
          const value = this.skillsForm.get(key)?.value;
          if (key === 'languages') {
            // Convert the languages array to a JSON string
            formData.append(key, JSON.stringify(value)); // Append as JSON string
          } else {
            formData.append(key, value); // Append other values normally
          }
        });
        // console.log(formData);



        // const formData = new FormData();
        // skillsData.append('file', this.skillsForm.get('file')?.value); // Use optional chaining

        // skillsData.append('this.selectedFile', this.skillsForm.get('upload_resume').value);

        // Submit the skills data to the API
        const response = await this.apiService.submitSkills(formData).toPromise();
        this.presentToast('Data saved successfully!'); // Show success message
        // console.log(response); // Log the response for debugging
        this.router.navigate(['/reg-review']); // Navigate to the review page
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


  previousPage() {
    this.router.navigate(['/reg-experience']);
  }



  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.skillsForm.patchValue({
        upload_resume: file // Set the file in the form control
      });
    }
  }



  async uploadFile() {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    try {
      // Prepare FormData for upload
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      // Use the apiService to upload the file
      const response = await this.apiService.uploadResume(formData).toPromise();
      // console.log('File uploaded:', response);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }


  //language add dynamically 
  get languages(): FormArray {
    return this.skillsForm.get('languages') as FormArray;
  }

  addLanguage() {
    if (this.languages.length < 5) {
      this.languages.push(this.formBuilder.group({
        language: ['', Validators.required],
        proficiency: ['', Validators.required],
        rws: this.formBuilder.array([])
      }));
    }
  }

  removeLanguage() {
    // if (this.languages.length > 1) {
    //   this.languages.removeAt(this.languages.length - 1);
    // }

    this.isdeleteLoading = true;

    if (this.languages.length > 1) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        const languageToRemove = this.languages.at(this.languages.length - 1).value;
        const language_id = this.languages.length;
        console.log("languageToRemove", languageToRemove);
        console.log("language id", language_id);
        this.apiService.deleteLanguage(language_id, userId).subscribe(
          response => {
            console.log('Language deleted successfully', response);
            this.languages.removeAt(this.languages.length - 1);
            this.isdeleteLoading = false;

          },
          error => {
            console.error('Error deleting language', error);
          }
        );
      }
    }

  }

  onRwsChange(event: CustomEvent, index: number, skill: string) {

    try {
      const languageForm = this.languages.at(index) as FormGroup;
      const rwsControl = languageForm.get('rws') as FormArray;

      console.log(typeof rwsControl, rwsControl instanceof FormArray);

      if (event.detail.checked) {
        rwsControl.push(this.formBuilder.control(skill));
      } else {
        const skillIndex = rwsControl.value.indexOf(skill);
        if (skillIndex >= 0) {
          rwsControl.removeAt(skillIndex);
        }
      }
    } catch (error) {
      console.error('Error in onRwsChange:', error);
      // Handle the error appropriately
    }
  }


  // onRwsChange(event: any, index: number, rws: string) {
  //   const languageForm = this.skillsForm.get('languages')['controls'][index] as FormGroup;
  //   const rwsControl = languageForm.get('rws') as FormArray;

  //   if (event.detail.checked) {
  //     rwsControl.push(new FormControl(rws));
  //   } else {
  //     const controlIndex = rwsControl.controls.findIndex(control => control.value === rws);
  //     rwsControl.removeAt(controlIndex);
  //   }
  // }

  getRwsValues(index: number): string {
    const languageForm = this.languages.at(index) as FormGroup;
    const rwsControl = languageForm.get('rws') as FormArray;
    return rwsControl.value.join(', ');
  }



  // onLocationChange(location: string) {
  //   this.skillsForm.patchValue({
  //     workLocation: location
  //   });

  // }

  onLocationChange(location: string) {
    const currentValues = this.skillsForm.get('workLocation')!.value as string[] || [];
    let updatedValues: string[] = [];

    switch (location) {
      case 'withinCity':
        updatedValues = this.toggleLocation(currentValues, 'withinCity', ['anywhereInIndia']);
        break;
      case 'otherState':
        updatedValues = this.toggleLocation(currentValues, 'otherState', ['anywhereInIndia']);
        break;
      case 'anywhereInIndia':
        updatedValues = this.toggleLocation(currentValues, 'anywhereInIndia', ['withinCity', 'otherState']);
        break;
    }


    // Check if 'otherState' is included in the updated values
    this.showOtherState = updatedValues.includes('otherState');
    //also add validator requried for job_states
    this.skillsForm.get('job_states')?.setValidators([Validators.required]);
    this.skillsForm.get('job_states')?.updateValueAndValidity();

    // If 'otherState' is not selected, reset the job_states
    if (!this.showOtherState) {
      this.skillsForm.get('job_states')!.setValue([]);
      //clear the job_states required validator
      this.skillsForm.get('job_states')?.clearValidators();
      // this.experienceForm.get('industryType')?.reset();
      this.skillsForm.get('job_states')?.updateValueAndValidity();


    }

    this.skillsForm.get('workLocation')!.setValue(updatedValues);
  }

  private toggleLocation(currentValues: string[], locationToToggle: string, locationsToRemove: string[]): string[] {
    if (currentValues.includes(locationToToggle)) {
      return currentValues.filter(value => value !== locationToToggle);
    } else {
      return [locationToToggle, ...currentValues.filter(value => !locationsToRemove.includes(value))];
    }
  }


  isStateSelectionDisabled(): boolean {
    const selectedStates = this.skillsForm.get('job_states')!.value as string[];
    return selectedStates && selectedStates.length >= this.maxStates;
  }

  updateForm() {

    // console.log("skill update is pending");
    console.log("updating value of fommmm", this.skillsForm.value);
    // Logic to update the existing form data
    if (this.skillsForm.valid) {
      const userId = localStorage.getItem('userId');
      const formKey = 'skillsForm'; // The key for the form
      if (userId) {
        this.apiService.updateFormData(formKey, userId, this.skillsForm.value).subscribe(
          (response) => {
            // console.log('Form updated successfully:', response);
            // this.router.navigate(['/reg-review']);
            // Navigate to next page and replace the current one in history
            this.router.navigate(['/reg-review'], { replaceUrl: true });
          },
          (error) => {
            console.error('Error updating form:', error);
            // Handle error response, e.g., show an error message
          }
        );
      } else {
        console.error('Form is invalid');
      }
    } else {
      console.log("userid not found");
    }
  }


}
