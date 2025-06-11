import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExploreTabPage } from './explore-tab.page';

const routes: Routes = [
  {
    path: '',
    component: ExploreTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExploreTabPageRoutingModule {}
