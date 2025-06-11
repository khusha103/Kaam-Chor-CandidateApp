import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import lottie from 'lottie-web';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  //  this.initial_nav();
  }

  ionViewWillEnter() {
   this.initial_nav();

  }

  initial_nav(){
     setTimeout(() => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (isLoggedIn) {
        this.router.navigate(['/tabs/home']);  
       
      } else {
        this.router.navigate(['/login']);
        // this.router.navigate(['/reg-aboutme']);  
      }
    }, 3000);
    
  }




  navigateToAppropriateRoute() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      this.router.navigate(['/tabs/home']);  
      
    } else {
      this.router.navigate(['/login']);
      // this.router.navigate(['/reg-aboutme']);  
    }
  }

}
