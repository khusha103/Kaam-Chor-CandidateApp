import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Testpage1PageRoutingModule } from './testpage-1-routing.module';

import { Testpage1Page } from './testpage-1.page';
import { FooterTabsComponent } from 'src/app/components/footer-tabs/footer-tabs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Testpage1PageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [Testpage1Page,FooterTabsComponent]
})
export class Testpage1PageModule {}
