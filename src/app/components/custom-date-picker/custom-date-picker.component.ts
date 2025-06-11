import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CalendarComponentOptions } from '../../interfaces/calendar-options.interface';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-date-picker',
  templateUrl: './custom-date-picker.component.html',
  styleUrls: ['./custom-date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomDatePickerComponent,
      multi: true
    }
  ]
})
export class CustomDatePickerComponent implements OnInit, ControlValueAccessor {
  @Input() options: CalendarComponentOptions = {};
  @Output() dateChange: EventEmitter<string> = new EventEmitter<string>();

  date: string | undefined;
  disabled: boolean = false;
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() {}

  ngOnInit() {
    this.setDefaultOptions();
  }

  setDefaultOptions() {
    const defaultOptions: CalendarComponentOptions = {
      pickMode: 'single',
      color: 'primary'
    };
    this.options = { ...defaultOptions, ...this.options };
  }

  writeValue(value: string): void {
    this.date = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // onDateSelect(event: { from: string; to: string }) {
  //   this.date = event.from;
  //   this.onChange(this.date);
  //   this.onTouched();
  //   this.dateChange.emit(this.date);
  // }

  onDateSelect(event: any) {
    console.log('Calendar event:', event);
    if (event && event.time) {
      this.date = new Date(event.time).toISOString();
    } else if (typeof event === 'string') {
      this.date = event;
    }
    this.onChange(this.date);
    this.onTouched();
    this.dateChange.emit(this.date);
  }
}