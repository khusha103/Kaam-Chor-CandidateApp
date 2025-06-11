import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegReviewPageRoutingModule } from './reg-review-routing.module';

import { RegReviewPage } from './reg-review.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegReviewPageRoutingModule,
    SharedModule
  ],
  declarations: [RegReviewPage]
})
export class RegReviewPageModule {}
