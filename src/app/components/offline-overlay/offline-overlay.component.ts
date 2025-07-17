import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-offline-overlay',
  templateUrl: './offline-overlay.component.html',
  styleUrls: ['./offline-overlay.component.scss'],
})
export class OfflineOverlayComponent {
  isOnline = true;
  isChecking = false;

  constructor(private networkService: NetworkService, private router: Router) {
    this.networkService.isOnline$.subscribe((status) => {
      this.isOnline = status;

      if (status) {
        const currentRoute = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigateByUrl(currentRoute); // refresh page
        });
      }
    });
  }

  async retryConnection() {
  this.isChecking = true;
  this.networkService.checkCurrentStatus().then((status) => {
    this.isOnline = status;
    this.isChecking = false;
  });
}

}
