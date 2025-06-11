import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegAboutmePage } from './reg-aboutme.page';

const routes: Routes = [
  {
    path: '',
    component: RegAboutmePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegAboutmePageRoutingModule {}
