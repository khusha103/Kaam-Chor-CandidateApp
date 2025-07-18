import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegExperiencePage } from './reg-experience.page';

const routes: Routes = [
  {
    path: '',
    component: RegExperiencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegExperiencePageRoutingModule {}
