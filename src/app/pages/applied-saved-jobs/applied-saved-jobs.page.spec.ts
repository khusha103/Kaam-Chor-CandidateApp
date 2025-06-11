import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppliedSavedJobsPage } from './applied-saved-jobs.page';

describe('AppliedSavedJobsPage', () => {
  let component: AppliedSavedJobsPage;
  let fixture: ComponentFixture<AppliedSavedJobsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedSavedJobsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
