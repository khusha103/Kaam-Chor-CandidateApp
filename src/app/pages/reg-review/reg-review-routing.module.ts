import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegReviewPage } from './reg-review.page';

const routes: Routes = [
  {
    path: '',
    component: RegReviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegReviewPageRoutingModule {}
