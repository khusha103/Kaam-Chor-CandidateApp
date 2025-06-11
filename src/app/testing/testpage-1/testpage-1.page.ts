import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-testpage-1',
  templateUrl: './testpage-1.page.html',
  styleUrls: ['./testpage-1.page.scss'],
})
export class Testpage1Page implements OnInit {
  skillsForm!: FormGroup;
  showOtherState : boolean = false;
  maxStates: number = 5;

  states: any[] = []; 

  constructor(private router:Router,private formBuilder: FormBuilder,private apiService:ApiService) { }

  ngOnInit() {
    this.loadStates(); 
    this.initializeForm();
  }


  initializeForm() {
    this.skillsForm = this.formBuilder.group({
     
      workLocation: [[]],
      jobStates: [[]]
      
      
      // languages: this.formBuilder.array([])
    }); 
    
    // this.addLanguage(); // Initialize with one language field

    // Add a listener to the jobStates control
    this.skillsForm.get('jobStates')!.valueChanges.subscribe((selectedStates: string[]) => {
      if (selectedStates && selectedStates.length > this.maxStates) {
        // If more than 5 states are selected, keep only the first 5
        const limitedStates = selectedStates.slice(0, this.maxStates);
        this.skillsForm.get('jobStates')!.setValue(limitedStates, { emitEvent: false });
      }
    });
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

  // If 'otherState' is not selected, reset the jobStates
  if (!this.showOtherState) {
    this.skillsForm.get('jobStates')!.setValue([]);
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
    const selectedStates = this.skillsForm.get('jobStates')!.value as string[];
    return selectedStates && selectedStates.length >= this.maxStates;
  }
}
