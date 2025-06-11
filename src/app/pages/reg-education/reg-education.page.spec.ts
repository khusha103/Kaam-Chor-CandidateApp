import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegEducationPage } from './reg-education.page';

describe('RegEducationPage', () => {
  let component: RegEducationPage;
  let fixture: ComponentFixture<RegEducationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegEducationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
