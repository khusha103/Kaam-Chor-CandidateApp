import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-tabs',
  templateUrl: './form-tabs.component.html',
  styleUrls: ['./form-tabs.component.scss']
})
export class FormTabsComponent implements OnInit {
 

  // currentPage: number = 0;
  // formPages: string[] = ['Aboutme', 'Education', 'Experience', 'Skills', 'Review'];


  @Input() currentPage!: number;
  @Input() progress!: number;

  // formPages: string[] = ['Aboutme', 'Education', 'Experience', 'Skills', 'Review'];
  // steps: string[] = ['Aboutme', 'Education', 'Experience', 'Skills', 'Review'];
  steps: string[] = ['Education', 'Experience', 'Preference', 'Review'];


  // steps = ['Education', 'Step 2', 'Step 3', 'Step 4']; // Customize step names as needed

  constructor() { }

  ngOnInit() { }

  getProgress(): number {
    return this.progress;
  }

 
  
  
}
