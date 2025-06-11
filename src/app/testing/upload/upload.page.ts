// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-upload',
//   templateUrl: './upload.page.html',
//   styleUrls: ['./upload.page.scss'],
// })
// export class UploadPage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }


import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service'; // Adjust the path as necessary

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage {
  uploadForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.uploadForm = this.formBuilder.group({
      upload_resume: [null, Validators.required]
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.uploadForm.patchValue({
        upload_resume: file // Set the file in the form control
      });
    }
  }

  onSubmit() {
    if (this.uploadForm.valid) {
      const formData = new FormData();
      formData.append('file', this.uploadForm.get('upload_resume')?.value); // Use optional chaining

      // Adding a constant value
      const additionalValue = 'someConstantValue';
      formData.append('additionalKey', additionalValue);
console.log(formData);

      this.apiService.uploadFile(formData).subscribe(
        response => console.log('Upload successful!', response),
        error => console.error('Error uploading file:', error)
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
