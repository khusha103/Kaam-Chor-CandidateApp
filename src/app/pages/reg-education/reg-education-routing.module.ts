import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegEducationPage } from './reg-education.page';

const routes: Routes = [
  {
    path: '',
    component: RegEducationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegEducationPageRoutingModule {}
