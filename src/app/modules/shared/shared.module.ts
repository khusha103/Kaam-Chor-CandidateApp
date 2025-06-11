import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormTabsComponent } from 'src/app/components/form-tabs/form-tabs.component';
// import { FormProgressComponent } from 'src/app/components/form-progress/form-progress.component';
// import { LanguageComponent } from 'src/app/components/language/language.component';
import { CustomDatePickerComponent } from 'src/app/components/custom-date-picker/custom-date-picker.component';
import { JobFilterComponent } from 'src/app/components/job-filter/job-filter.component';

@NgModule({
  declarations: [FormTabsComponent,CustomDatePickerComponent,JobFilterComponent],
  imports: [
    CommonModule
  ],
  exports: [FormTabsComponent,CustomDatePickerComponent,JobFilterComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
