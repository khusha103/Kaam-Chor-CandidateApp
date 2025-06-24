import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import lottie from 'lottie-web';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {

  constructor(private router: Router,private storage: Storage) { 
    this.initStorage();

  }
  async initStorage() {
    await this.storage.create();
  }

  ngOnInit() {
    lottie.loadAnimation({
      container: document.getElementById('lottie')!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'assets/kaamchor.json' 
    });

    setTimeout(() => {
      document.getElementById('splash-screen')!.style.display = 'none';
      this.navigateToAppropriateRoute();
    }, 3000); 
  }

  async navigateToAppropriateRoute() {
    // const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isLoggedIn= await this.storage.get('isLoggedIn') || false;
    if (isLoggedIn) {
      this.router.navigate(['/tabs/home']);  
      // this.router.navigate(['/reg-skills']);  
      // this.router.navigate(['/reg-skills']);  


    } else {
      this.router.navigate(['/login']);
      // this.router.navigate(['/reg-aboutme']);  
    }
  }
}