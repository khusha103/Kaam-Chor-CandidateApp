import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegExperiencePageRoutingModule } from './reg-experience-routing.module';

import { RegExperiencePage } from './reg-experience.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegExperiencePageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [RegExperiencePage]
})
export class RegExperiencePageModule {}
