import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Testpage1Page } from './testpage-1.page';

const routes: Routes = [
  {
    path: '',
    component: Testpage1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Testpage1PageRoutingModule {}
