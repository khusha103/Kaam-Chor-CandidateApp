import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppliedSavedJobsPageRoutingModule } from './applied-saved-jobs-routing.module';

import { AppliedSavedJobsPage } from './applied-saved-jobs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppliedSavedJobsPageRoutingModule
  ],
  declarations: [AppliedSavedJobsPage]
})
export class AppliedSavedJobsPageModule {}
