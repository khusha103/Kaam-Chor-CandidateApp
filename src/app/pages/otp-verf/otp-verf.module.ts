import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtpVerfPageRoutingModule } from './otp-verf-routing.module';

import { OtpVerfPage } from './otp-verf.page';
import { OtpInputComponent } from 'src/app/components/otp-input/otp-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtpVerfPageRoutingModule
  ],
  declarations: [OtpVerfPage,OtpInputComponent]
})
export class OtpVerfPageModule {}
