// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoadingService {

//   constructor() { }
// }

// import { Injectable } from '@angular/core';
// import {
//   HttpInterceptor,
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { finalize } from 'rxjs/operators';
// import { LoadingService } from '../services/loading.service';

// @Injectable()
// export class LoadingInterceptor implements HttpInterceptor {
//   constructor(private loadingService: LoadingService) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     this.loadingService.show(); // Show loader when request starts

//     return next.handle(req).pipe(
//       finalize(() => {
//         this.loadingService.hide(); // Hide loader when request completes
//       })
//     );
//   }
// }


// import { Injectable } from '@angular/core';
// import {
//   HttpInterceptor,
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpResponse,
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { tap, finalize } from 'rxjs/operators';
// import { LoadingService } from '../services/loading.service';

// @Injectable()
// export class LoadingInterceptor implements HttpInterceptor {
//   constructor(private loadingService: LoadingService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     this.loadingService.show(); // Show loader when request starts

//     return next.handle(req).pipe(
//       tap((event: HttpEvent<any>) => {
//         if (event instanceof HttpResponse && event.body) {
//           this.loadingService.hide(); // Hide loader when response has data
//         }
//       }),
//       finalize(() => {
//         this.loadingService.hide(); // Ensure loader hides even if error occurs
//       })
//     );
//   }
// }


import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private activeRequests = 0;
  private loader!: HTMLIonLoadingElement;

  constructor(private loadingCtrl: LoadingController) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.activeRequests === 0) {
      this.showLoader();
    }

    this.activeRequests++;

    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
          this.hideLoader();
        }
      })
    );
  }

  // private async showLoader() {
  //   console.log("show loader");
  //   this.loader = await this.loadingCtrl.create({
  //     message: 'Loading...',
  //     spinner: 'circles',
  //     cssClass: 'sony-promoters-loader',
  //     backdropDismiss: false,
  //     translucent: true
  //   });
  //   await this.loader.present();
  // }

  private async showLoader() {
    console.log("%c🚀 Loading in progress... Please wait!", "color: #ff9800; font-weight: bold;");

    this.loader = await this.loadingCtrl.create({
      message: this.getRandomLoadingMessage(),
      spinner: 'circles',
      cssClass: 'sony-promoters-loader',
      backdropDismiss: false,
      translucent: true
    });

    await this.loader.present();
  }

// private getRandomLoadingMessage(): string {
//     const messages = [
//       "Gearing up...",
//       "Almost there...",
//       "Fetching awesomeness...",
//       "One moment...",
//       "Processing magic..."
//     ];
//     return messages[Math.floor(Math.random() * messages.length)];
// }

private getRandomLoadingMessage(): string {
  const messages = [
    "Gearing up...",
    "Almost there...",
    "Fetching awesomeness...",
    "One moment...",
    "Processing magic..."
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}


  private hideLoader() {
    console.log("hide loader");
    if (this.loader) {
      this.loader.dismiss();
    }
  }
}


