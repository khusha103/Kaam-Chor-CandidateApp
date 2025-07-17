import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Network } from '@capacitor/network';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private onlineSubject = new BehaviorSubject<boolean>(false); // ❌ Changed from true to false
  isOnline$ = this.onlineSubject.asObservable();

  constructor() {
    this.initNetworkListener(); // ❌ Removed setTimeout
  }

  private async initNetworkListener() {
    const status = await this.checkCurrentStatus(); // get initial state
    this.onlineSubject.next(status);

    Network.addListener('networkStatusChange', (status) => {
      this.onlineSubject.next(status.connected);
    });
  }

  async checkCurrentStatus(): Promise<boolean> {
    try {
      const status = await Network.getStatus();
      return status.connected;
    } catch (e) {
      return navigator.onLine;
    }
  }
}
