import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtpVerfPage } from './otp-verf.page';

const routes: Routes = [
  {
    path: '',
    component: OtpVerfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtpVerfPageRoutingModule {}
