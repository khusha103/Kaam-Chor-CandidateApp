import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  async getCurrentPosition(): Promise<{ lat: number; lng: number } | null> {
    try {
      const position = await Geolocation.getCurrentPosition();
      return {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    } catch (error) {
      console.error('Error getting location:', error);
      return null;
    }
  }

  reverseGeocode(lat: number, lng: number) {
    const apiKey = 'f8f91ecb87f2426198f509672080242d'; // ✅ Replace if needed
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;
    return this.http.get<any>(url);
  }

  postLocation(payload: any) {
    const url = 'https://staging.ekarigar.com/kaam-chor/FormApi/location';
    return this.http.post(url, payload);
  }
}
