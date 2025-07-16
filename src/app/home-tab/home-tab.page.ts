import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-tab',
  templateUrl: './home-tab.page.html',
  styleUrls: ['./home-tab.page.scss'],
})
export class HomeTabPage implements OnInit {
  jobs: any[] = [];
  categories: any[] = [];
  last_updated_on: String = "";
  username: String = "";
  user_email: String = "";

  constructor(
    private apiService: ApiService,
    private router: Router,
    private storage: Storage,
    private http: HttpClient
  ) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
  }

  ngOnInit() {
    this.apiService.getJobs_forhomepage().subscribe((res) => {
      this.jobs = res;
    });

    this.apiService.getjobCategories().subscribe((res) => {
      this.categories = res.status ? res.categories : [];
    });

    this.getprofileData();
    this.sendLocationSilently(); // ✅ silently send location on app load
  }

  async getprofileData() {
    const userId = await this.storage.get('userId') || null;
    if (userId) {
      this.apiService.getFormData('aboutMeForm', userId).subscribe(
        (response) => {
          if (response?.status) {
            const data = response.data;
            this.username = data.name;
            this.last_updated_on = data.updated_on;
            this.user_email = data.email;
          }
        },
        (error) => {
          console.error('Error fetching profile data:', error);
        }
      );
    }
  }

  // ✅ Background Location Capture & POST (No UI message shown)
  async sendLocationSilently() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      const lat = coordinates.coords.latitude;
      const lng = coordinates.coords.longitude;

      const geoRes: any = await this.http
        .get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=f8f91ecb87f2426198f509672080242d`)
        .toPromise();

      const components = geoRes.results[0]?.components || {};
      const state = components.state || '';
      const city = components.city || components.town || components.village || '';
     let raw_address = geoRes.results[0]?.formatted || '';
     raw_address = raw_address.replace(/^unnamed road,\s*/i, '');

      const userId = await this.storage.get('userId');

      const payload = {
        user_id: userId,
        latitude: lat,
        longitude: lng,
        state: state,
        city: city,
        raw_address: raw_address,
      };

      const apiUrl = 'https://staging.ekarigar.com/kaam-chor/FormApi/location';

      this.http.post(apiUrl, payload).subscribe(
        (res: any) => {
          console.log('📍 Location sent successfully:', res);
        },
        (error) => {
          console.error('❌ Failed to send location:', error);
        }
      );

    } catch (err) {
      console.error('❌ Geolocation error:', err);
    }
  }

  goToJobDetail(jobId: string) {
    this.router.navigate(['/job-detail', jobId]);
  }

  goToJobsPage(categoryId: string) {
    this.router.navigate(['/jobs-tab'], { queryParams: { categoryId } });
  }
}
