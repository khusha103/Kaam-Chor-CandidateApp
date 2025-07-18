import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastController } from '@ionic/angular';
// import { NetworkService } from '../services/network.service';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(
    private toastController: ToastController,
    // private networkService: NetworkService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleErrorToast(error); // ✅ async toast call without affecting observable
        return throwError(() => error);
      })
    );
  }

  private async handleErrorToast(error: HttpErrorResponse) {
    // const isOnline = await this.networkService.checkCurrentStatus();
    if ( error.status === 0) {
      const toast = await this.toastController.create({
        message: '🚫 Server down.....Try Again',
        duration: 3000,
        color: 'danger',
        position: 'bottom',
      });
      toast.present();
    }
  }
}
