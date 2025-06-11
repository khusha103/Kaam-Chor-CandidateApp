import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobsTabPageRoutingModule } from './jobs-tab-routing.module';

import { JobsTabPage } from './jobs-tab.page';
import { FilterPipe } from '../pipes/filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobsTabPageRoutingModule
  ],
  declarations: [JobsTabPage,FilterPipe]
})
export class JobsTabPageModule {}
