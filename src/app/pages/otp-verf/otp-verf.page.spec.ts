import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OtpVerfPage } from './otp-verf.page';

describe('OtpVerfPage', () => {
  let component: OtpVerfPage;
  let fixture: ComponentFixture<OtpVerfPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpVerfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
