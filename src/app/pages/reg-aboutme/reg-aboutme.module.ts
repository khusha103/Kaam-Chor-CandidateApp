import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegAboutmePageRoutingModule } from './reg-aboutme-routing.module';

import { RegAboutmePage } from './reg-aboutme.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';
// import { IonCalendarModule } from 'ion-calendar';
// import { FormTabsComponent } from 'src/app/components/form-tabs/form-tabs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegAboutmePageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    // IonCalendarModule
  ],
  declarations: [RegAboutmePage]
})
export class RegAboutmePageModule {}
