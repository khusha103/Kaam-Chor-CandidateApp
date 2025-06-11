// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoadingService {

//   constructor() { }
// }


// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoadingService {
//   private loadingSubject = new BehaviorSubject<boolean>(false);
//   loading$ = this.loadingSubject.asObservable();

//   show() {
//     this.loadingSubject.next(true);
//     console.log("loading");
//   }

//   hide() {
//     this.loadingSubject.next(false);
//     console.log("hide loaded");
//   }
// }

import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading: HTMLIonLoadingElement | null = null;
  loading$: any;

  constructor(private loadingController: LoadingController) {}

  async show() {
    if (!this.loading) {
      this.loading = await this.loadingController.create({
        message: 'Loading...',
        spinner: 'crescent', // Choose the spinner type (dots, bubbles, crescent, etc.)
        translucent: true,
        backdropDismiss: false
      });
      await this.loading.present();
    }
  }

  async hide() {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }
}

