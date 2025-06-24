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
  private confirmRoutes = ['/reg-aboutme', '/reg-education', '/reg-experience', '/reg-skills', '/reg-review'];

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
      await StatusBar.setStyle({ style: Style.Light });
    }
  }

  async handleBackButton() {
    this.platform.backButton.subscribeWithPriority(9999, async (processNextHandler) => {
      const currentUrl = this.router.url;

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
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                // Stay on the current page
              },
            },
            {
              text: 'Confirm',
              handler: () => {
                // Navigate to homepage
                this.navCtrl.navigateRoot('/tabs/home');
              },
            },
          ],
        });

        await alert.present();
      } else {
        // Allow normal back navigation for other routes
        this.navCtrl.back();
      }
    });
  }
}

