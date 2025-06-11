import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-reg-experience',
  templateUrl: './reg-experience.page.html',
  styleUrls: ['./reg-experience.page.scss'],
})
export class RegExperiencePage implements OnInit {

  constructor(private router:Router,private formBuilder: FormBuilder,private apiService: ApiService) { }
  experienceForm!: FormGroup;
  
  currentPage: number = 0;
  progress: number = 0;
  expyes: boolean = false;
  industryTypes: any[] = []; 

  initializeForm() {
    // this.experienceForm = this.formBuilder.group({
    //   hasExperience: [''],
    //   totalYears: ['', [Validators.required, Validators.min(1), Validators.max(30)]],
    //   jobTitle: ['', Validators.required],
    //   companyName: ['', Validators.required],
    //   monthlySalary: ['', [Validators.required, Validators.min(1000)]],
    //   industryType: ['', Validators.required],
    // });


    this.experienceForm = this.formBuilder.group({
      hasExperience: [''],
      totalYears: [''],
      jobTitle: [''],
      companyName: [''],
      monthlySalary: [''],
      industryType: ['']
    });
  }

  ngOnInit() {
    // console.error();
    this.load_industrytypes();
    this.currentPage = 2;
    this.progress = 60;
    console.log(this.currentPage);
    console.log(this.progress);

    this.initializeForm();

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
 
  formPages: string[] = ['Aboutme', 'Education', 'Experience', 'Skills', 'Review'];


  // nextPage() {
  onSubmit(){
    if (this.experienceForm.valid) {
      console.log("valid exo form");
      console.log(this.experienceForm.value);
      this.router.navigate(['/reg-skills']);
    }
    // this.router.navigate(['/reg-skills']);
    else {
      // Mark all controls as touched to trigger validation messages
      this.experienceForm.markAllAsTouched();
      console.log(this.experienceForm.markAllAsTouched());
      console.log(this.experienceForm.value);
      
    }
  }

  previousPage() {
    this.router.navigate(['/reg-education']);
  }

  onselect(event: any){
    // console.log("onslecte exp");
    console.log(event.detail.value);
    
    // if yes set flag show div else not show
    if(event.detail.value == "Yes"){
      this.expyes = true;

      // console.log('Validators after clearing:', this.experienceForm.get('totalYears')?.validator);

      // Set validators for experience fields
    this.experienceForm.get('totalYears')?.setValidators([Validators.required]);
    this.experienceForm.get('jobTitle')?.setValidators([Validators.required]);
    this.experienceForm.get('companyName')?.setValidators([Validators.required]);
    this.experienceForm.get('monthlySalary')?.setValidators([Validators.required]);
    this.experienceForm.get('industryType')?.setValidators([Validators.required]);

    }else{
      this.expyes = false;
      console.log("else checkbox");
         //unset validators here
    this.experienceForm.get('totalYears')?.clearValidators();
    this.experienceForm.get('jobTitle')?.clearValidators();
    this.experienceForm.get('companyName')?.clearValidators();
    this.experienceForm.get('monthlySalary')?.clearValidators();
    this.experienceForm.get('industryType')?.clearValidators();


    // this.experienceForm.get('totalYears').removeValidators(Validators.required);
    // this.experienceForm.get('jobTitle').removeValidators(Validators.required);

    // this.experienceForm.get('companyName').removeValidators(Validators.required);

    // this.experienceForm.get('monthlySalary').removeValidators(Validators.required);

   
    // this.experienceForm.setControl('totalYears', this.formBuilder.control(''));
    // this.experienceForm.setControl('jobTitle', this.formBuilder.control(''));

    // this.experienceForm.setControl('companyName', this.formBuilder.control(''));

    // this.experienceForm.setControl('monthlySalary', this.formBuilder.control(''));

    // this.experienceForm.get('totalYears').setValidators(null);

    //try with add minmax remove validators also
    


      //  Set values to null or empty string
      //  this.experienceForm.get('totalYears')?.setValue('-');
      //  this.experienceForm.get('jobTitle')?.setValue('-');
      //  this.experienceForm.get('companyName')?.setValue('-');
      //  this.experienceForm.get('monthlySalary')?.setValue('-');


        
  // console.log('Form Validity:', this.experienceForm.value);
  // console.log('Validators after clearing:', this.experienceForm.get('totalYears')?.validator);

   // Update the form control validators
   this.experienceForm.get('totalYears')?.updateValueAndValidity();
   this.experienceForm.get('jobTitle')?.updateValueAndValidity();
   this.experienceForm.get('companyName')?.updateValueAndValidity();
   this.experienceForm.get('monthlySalary')?.updateValueAndValidity();
   this.experienceForm.get('industryType')?.updateValueAndValidity();


   // Update the validity of the form group
   this.experienceForm.updateValueAndValidity();

    }


   

    
  }


}
