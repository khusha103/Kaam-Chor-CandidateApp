import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegSkillsPageRoutingModule } from './reg-skills-routing.module';

import { RegSkillsPage } from './reg-skills.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegSkillsPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [RegSkillsPage]
})
export class RegSkillsPageModule {}
