import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import lottie from 'lottie-web';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

  constructor(private router: Router,private storage: Storage) { 
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
  }

  ngOnInit() {
  //  this.initial_nav();
  }

  ionViewWillEnter() {
   this.initial_nav();

  }

  initial_nav(){
     setTimeout(async () => {
      // const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
       const isLoggedIn= await this.storage.get('isLoggedIn') || false;
    // console.log('Retrieved isLoggedIn:', isLoggedIn);
      if (isLoggedIn) {
        this.router.navigate(['/tabs/home']);  
       
      } else {
        this.router.navigate(['/login']);
        // this.router.navigate(['/reg-aboutme']);  
      }
    }, 3000);
    
  }




  async navigateToAppropriateRoute() {
    // const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isLoggedIn= await this.storage.get('isLoggedIn') || false;
    // console.log('Retrieved isLoggedIn:', isLoggedIn);
    if (isLoggedIn) {
      this.router.navigate(['/tabs/home']);  
      
    } else {
      this.router.navigate(['/login']);
      // this.router.navigate(['/reg-aboutme']);  
    }
  }

}
