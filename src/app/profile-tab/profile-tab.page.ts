import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar, Style as StatusBarStyle} from '@capacitor/status-bar';

@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.page.html',
  styleUrls: ['./profile-tab.page.scss'],
})
export class ProfileTabPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    // StatusBar.setBackgroundColor({ color: '#ffffff' }); // white
      // Set the status bar style to dark (black text/icons)
      // StatusBar.setStyle({ style: StatusBarStyle.Dark });
  }


  navigateToSavesPage(){
    this.router.navigate(['/saved-jobs']);
  }
  navigateToApplicationsPage(){
    this.router.navigate(['/applied-jobs']);
  }

  // logout() {
  //   localStorage.removeItem('isLoggedIn');
  //   localStorage.removeItem('userId');
  //   this.router.navigate(['/login']);
  // }

  logout() {
    localStorage.clear(); // This removes all localStorage entries
    this.router.navigate(['/login']);
  }
  

  edit() {
    this.router.navigate(['/reg-aboutme']);
  }



 //upload resume functionality

 uploadedResumeName: string | null = null;
uploadedResumeUrl: string | null = null;

triggerFileUpload() {
  const fileInput = document.getElementById('resumeUpload') as HTMLInputElement;
  if (fileInput) {
    fileInput.click();
  }
}

onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];

    // Check if it is a PDF
    if (file.type !== 'application/pdf') {
      console.error('Only PDF files are allowed.');
      return;
    }

    // Save file name
    this.uploadedResumeName = file.name;

    // Save a temporary URL to view the PDF
    this.uploadedResumeUrl = URL.createObjectURL(file);

    console.log('Selected file:', file);
  }
}

openResume() {
  if (this.uploadedResumeUrl) {
    window.open(this.uploadedResumeUrl, '_blank');
  }
}


goToAppliedSavedJobs() {
  this.router.navigate(['/applied-saved-jobs']);
}



}
