import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient, private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
  }

  private apiUrl = `${environment.baseUrl}`;

  async initPush() {
    const platform = Capacitor.getPlatform();
    console.log('Detected platform:', platform); // log the platform for clarity

    if (platform === 'android' || platform === 'ios') {
      try {
        console.log('Requesting push permissions...');
        const permStatus = await PushNotifications.requestPermissions();
        console.log('Permission status:', permStatus);

        if (permStatus.receive === 'granted') {
          console.log('Permission granted, registering for push...');
          await PushNotifications.register();
        } else {
          console.warn('Push permission not granted:', permStatus);
          return;
        }

        PushNotifications.addListener('registration', async (token) => {
          console.log('FCM Token:', token.value); // THIS IS YOUR KEY LOG

          // ✅ Replace this with your actual logged-in user ID
          // const userId = 123; 
          const userId = await this.storage.get('userId') || null;
          console.log("userId", userId);

          // ✅ Call your API with HTTP POST
          this.http.post(`${this.apiUrl}/FormApi/save_fcm_token`, {
            user_id: userId,
            fcm_token: token.value
          }).subscribe({
            next: (response) => console.log('Token successfully sent to backend:', response),
            error: (err) => console.error('Error sending token to backend:', err)
          });
        });

        PushNotifications.addListener('registrationError', (error) => {
          console.error('Push registration error:', error);
        });

        PushNotifications.addListener('pushNotificationReceived', (notification) => {
          console.log('Push notification received:', notification);
        });

        PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
          console.log('Push notification action performed:', action);
        });
      } catch (e) {
        console.error('Error initializing push notifications:', e);
      }
    } else {
      console.log('Push notifications are not supported on this platform:', platform);
    }
  }

}
