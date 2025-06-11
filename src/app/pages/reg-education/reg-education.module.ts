import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegEducationPageRoutingModule } from './reg-education-routing.module';

import { RegEducationPage } from './reg-education.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegEducationPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [RegEducationPage]
})
export class RegEducationPageModule {}
