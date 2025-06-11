import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegAboutmePage } from './reg-aboutme.page';

describe('RegAboutmePage', () => {
  let component: RegAboutmePage;
  let fixture: ComponentFixture<RegAboutmePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegAboutmePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
