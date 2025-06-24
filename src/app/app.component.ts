


// import { Component } from '@angular/core';
// import { register } from 'swiper/element/bundle';
// import { Platform, NavController, AlertController } from '@ionic/angular';
// import { StatusBar, Style } from '@capacitor/status-bar';
// import { Router } from '@angular/router';

// register();

// @Component({
//   selector: 'app-root',
//   templateUrl: 'app.component.html',
//   styleUrls: ['app.component.scss'],
// })
// export class AppComponent {
//   private restrictedRoutes = ['/tabs/profile', '/tabs/explore', '/tabs/jobs', '/tabs/home'];
//   private confirmRoutes = ['/reg-aboutme', '/reg-education', '/reg-experience', '/reg-skills', '/reg-review'];

//   constructor(
//     private platform: Platform,
//     private router: Router,
//     private navCtrl: NavController,
//     private alertCtrl: AlertController
//   ) {
//     this.initializeApp();
//     this.handleBackButton();
//   }

//   async initializeApp() {
//     await this.platform.ready();
    
//     if (this.platform.is('capacitor')) {
//       await StatusBar.setBackgroundColor({ color: '#ffffff' });
//       await StatusBar.setStyle({ style: Style.Light });
//     }
//   }

//   async handleBackButton() {
//     this.platform.backButton.subscribeWithPriority(9999, async (processNextHandler) => {
//       const currentUrl = this.router.url;

//       // Prevent back navigation on restricted routes
//       if (this.restrictedRoutes.includes(currentUrl)) {
//         return;
//       }

//       // Show confirmation alert for specified routes
//       if (this.confirmRoutes.includes(currentUrl)) {
//         const alert = await this.alertCtrl.create({
//           header: 'Confirm',
//           message: 'Are you sure you want to go back to the homepage? Any unsaved changes may be lost.',
//           buttons: [
//             {
//               text: 'Cancel',
//               role: 'cancel',
//               handler: () => {
//                 // Stay on the current page
//               },
//             },
//             {
//               text: 'Confirm',
//               handler: () => {
//                 // Navigate to homepage
//                 this.navCtrl.navigateRoot('/tabs/home');
//               },
//             },
//           ],
//         });

//         await alert.present();
//       } else {
//         // Allow normal back navigation for other routes
//         this.navCtrl.back();
//       }
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Platform, NavController, AlertController } from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Router, NavigationStart } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  private restrictedRoutes = ['/tabs/profile', '/tabs/explore', '/tabs/jobs', '/tabs/home'];
  private confirmRoutes = ['/reg-aboutme', '/reg-education', '/reg-experience', '/reg-skills', '/reg-review'];
  private publicRoutes = ['/login', '/splash', '/otp-verf'];

  constructor(
    private platform: Platform,
    private router: Router,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private storage: Storage // Inject Storage
  ) {
    this.initializeApp();
    this.handleBackButton();
  }

  async ngOnInit() {
    // Initialize Ionic Storage
    await this.storage.create();

    // Subscribe to router events to check login status
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        const url = event.url.split('?')[0]; // Remove query params
        const isPublicRoute = this.publicRoutes.includes(url);

        // Check login status and redirect if necessary
        this.checkLoginStatus().then(isLoggedIn => {
          if (!isLoggedIn && !isPublicRoute) {
            // Not logged in and trying to access a private page
            this.router.navigate(['/login'], { replaceUrl: true });
          } else if (isLoggedIn && isPublicRoute) {
            // Logged in and trying to access a public page (optional)
            this.router.navigate(['/tabs/home'], { replaceUrl: true });
          }
        });
      }
    });
  }

  async initializeApp() {
    await this.platform.ready();
    if (this.platform.is('capacitor')) {
      await StatusBar.setBackgroundColor({ color: '#ffffff' });
      await StatusBar.setStyle({ style: Style.Light });
    }
  }

  async checkLoginStatus(): Promise<boolean> {
    try {
      // Retrieve isLoggedIn from Ionic Storage
      return (await this.storage.get('isLoggedIn')) || false;
    } catch (error) {
      console.error('Error checking login status', error);
      return false; // Default to false if there's an error
    }
  }

  async handleBackButton() {
    this.platform.backButton.subscribeWithPriority(9999, async () => {
      const currentUrl = this.router.url.split('?')[0];

      // Prevent back navigation on restricted routes
      if (this.restrictedRoutes.includes(currentUrl)) {
        return;
      }

      // Show confirmation alert for specified routes
      if (this.confirmRoutes.includes(currentUrl)) {
        const alert = await this.alertCtrl.create({
          header: 'Confirm',
          message: 'Are you sure you want to go back to the homepage? Any unsaved changes may be lost.',
          buttons: [
            { text: 'Cancel', role: 'cancel' },
            {
              text: 'Confirm',
              handler: () => {
                this.navCtrl.navigateRoot('/tabs/home');
              },
            },
          ],
        });
        await alert.present();
      } else {
        // Allow normal back navigation
        this.navCtrl.back();
      }
    });
  }
}