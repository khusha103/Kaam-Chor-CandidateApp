import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobsTabPage } from './jobs-tab.page';

const routes: Routes = [
  {
    path: '',
    component: JobsTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsTabPageRoutingModule {}
