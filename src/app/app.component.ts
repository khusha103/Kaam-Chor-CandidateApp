// import { Component } from '@angular/core';
// import { register } from 'swiper/element/bundle';
// import { Platform } from '@ionic/angular';
// import { StatusBar, Style } from '@capacitor/status-bar';
// register();

// @Component({
//   selector: 'app-root',
//   templateUrl: 'app.component.html',
//   styleUrls: ['app.component.scss'],
// })
// export class AppComponent {
//   constructor(private platform: Platform) {
//     // constructor() {

//     this.initializeApp();
  
//   }

//   async initializeApp() {
//     await this.platform.ready();
    
//     if (this.platform.is('capacitor')) {
//       await StatusBar.setBackgroundColor({ color: '#ffffff' });
      
//       // await StatusBar.setStyle({ style: Style.Dark }); // For light text
//       // await StatusBar.setStyle({ style: Style.Custom, color: '#333333' });

//     await StatusBar.setStyle({ style: Style.Light });


//     // / Set the status bar text color based on the platform
//     // if (this.platform.is('ios')) {
//     //   // On iOS, set the style to light content (dark text)
//     //   await StatusBar.setStyle({ style: Style.Dark });
//     // } else {
//     //   // On Android, the text color will automatically adjust based on the background color
//     // }

//     }
//   }
// }


import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Platform, NavController, AlertController } from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Router } from '@angular/router';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private restrictedRoutes = ['/tabs/profile', '/tabs/explore', '/tabs/jobs', '/tabs/home'];

  constructor(
    private platform: Platform,
    private router: Router,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {
    this.initializeApp();
    this.handleBackButton();
  }

  async initializeApp() {
    await this.platform.ready();
    
    if (this.platform.is('capacitor')) {
      await StatusBar.setBackgroundColor({ color: '#ffffff' });

      // await StatusBar.setStyle({ style: Style.Dark }); // For light text
      // await StatusBar.setStyle({ style: Style.Custom, color: '#333333' });

      await StatusBar.setStyle({ style: Style.Light });

      // / Set the status bar text color based on the platform
      // if (this.platform.is('ios')) {
      //   // On iOS, set the style to light content (dark text)
      //   await StatusBar.setStyle({ style: Style.Dark });
      // } else {
      //   // On Android, the text color will automatically adjust based on the background color
      // }
    }
  }

  handleBackButton() {
    this.platform.backButton.subscribeWithPriority(9999, async () => {
      const currentUrl = this.router.url;

      if (this.restrictedRoutes.includes(currentUrl)) {
        // Prevent back navigation on these restricted routes
        return;
      }

      // Allow normal back navigation for other routes
      this.navCtrl.back();
    });
  }
}

