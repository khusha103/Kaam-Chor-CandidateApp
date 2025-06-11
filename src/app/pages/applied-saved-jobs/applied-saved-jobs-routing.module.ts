import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppliedSavedJobsPage } from './applied-saved-jobs.page';

const routes: Routes = [
  {
    path: '',
    component: AppliedSavedJobsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppliedSavedJobsPageRoutingModule {}
