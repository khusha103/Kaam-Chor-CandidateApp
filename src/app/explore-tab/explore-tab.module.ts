import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExploreTabPageRoutingModule } from './explore-tab-routing.module';

import { ExploreTabPage } from './explore-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreTabPageRoutingModule
  ],
  declarations: [ExploreTabPage]
})
export class ExploreTabPageModule {}
