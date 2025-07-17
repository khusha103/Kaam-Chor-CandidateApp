


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

 import { Component, OnInit, OnDestroy } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Platform, NavController, AlertController, ToastController } from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Router, NavigationStart } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { NotificationService } from './services/notification.service';
import { NetworkService } from './services/network.service';
import { Subscription } from 'rxjs';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private restrictedRoutes = ['/tabs/profile', '/tabs/explore', '/tabs/jobs', '/tabs/home'];
  private confirmRoutes = ['/reg-aboutme', '/reg-education', '/reg-experience', '/reg-skills', '/reg-review'];
  private publicRoutes = ['/login', '/splash', '/otp-verf'];

  showOfflineOverlay: boolean = false;
  menuItems: any;
  private wasOffline = false;
  private networkSub!: Subscription;

  constructor(
    private platform: Platform,
    private router: Router,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private storage: Storage,
    private notificationService: NotificationService,
    private networkService: NetworkService,
    private toastCtrl: ToastController
  ) {
    this.initializeApp();
    this.handleBackButton();
    this.handleNetworkEvents(); // 👈 internet watch
  }

  async ngOnInit() {
    await this.storage.create();
    await this.notificationService.initPush();

    // 🔒 Login guard on route change
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        const url = event.url.split('?')[0];
        const isPublicRoute = this.publicRoutes.includes(url);

        this.checkLoginStatus().then(isLoggedIn => {
          if (!isLoggedIn && !isPublicRoute) {
            this.router.navigate(['/login'], { replaceUrl: true });
          } else if (isLoggedIn && isPublicRoute) {
            this.router.navigate(['/tabs/home'], { replaceUrl: true });
          }
        });
      }
    });
  }

  // ✅ Init app, set status bar
  async initializeApp() {
    await this.platform.ready();
    if (this.platform.is('capacitor')) {
      await StatusBar.setBackgroundColor({ color: '#ffffff' });
      await StatusBar.setStyle({ style: Style.Light });
    }

    // 🚨 Initial internet status check on launch
    const online = await this.networkService.checkCurrentStatus();
    if (!online) {
      this.wasOffline = true;
      const toast = await this.toastCtrl.create({
        message: "You're offline",
        duration: 2000,
        color: 'warning',
        position: 'bottom',
      });
      toast.present();
      this.showOfflineOverlay = true;
    }
  }

  // ✅ Handle internet status change
  handleNetworkEvents() {
    this.networkSub = this.networkService.isOnline$.subscribe(async (isOnline) => {
      if (!isOnline) {
        this.wasOffline = true;
        this.showOfflineOverlay = true;
      } else {
        if (this.wasOffline) {
          const toast = await this.toastCtrl.create({
            message: '✅ Back online',
            duration: 2000,
            color: 'success',
            position: 'bottom',
          });
          toast.present();
          this.wasOffline = false;
        }
        this.showOfflineOverlay = false;
      }
    });
  }

  async checkLoginStatus(): Promise<boolean> {
    try {
      return (await this.storage.get('isLoggedIn')) || false;
    } catch (error) {
      console.error('Login check failed', error);
      return false;
    }
  }

  async handleBackButton() {
    this.platform.backButton.subscribeWithPriority(9999, async () => {
      const currentUrl = this.router.url.split('?')[0];

      if (this.restrictedRoutes.includes(currentUrl)) return;

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
        this.navCtrl.back();
      }
    });
  }

  // ✅ Clean up observable
  ngOnDestroy() {
    if (this.networkSub) {
      this.networkSub.unsubscribe();
    }
  }
}
