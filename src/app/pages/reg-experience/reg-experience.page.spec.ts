import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegExperiencePage } from './reg-experience.page';

describe('RegExperiencePage', () => {
  let component: RegExperiencePage;
  let fixture: ComponentFixture<RegExperiencePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegExperiencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
