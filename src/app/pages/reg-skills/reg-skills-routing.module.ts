import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegSkillsPage } from './reg-skills.page';

const routes: Routes = [
  {
    path: '',
    component: RegSkillsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegSkillsPageRoutingModule {}
