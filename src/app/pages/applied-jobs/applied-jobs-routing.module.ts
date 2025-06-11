import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppliedJobsPage } from './applied-jobs.page';

const routes: Routes = [
  {
    path: '',
    component: AppliedJobsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppliedJobsPageRoutingModule {}
