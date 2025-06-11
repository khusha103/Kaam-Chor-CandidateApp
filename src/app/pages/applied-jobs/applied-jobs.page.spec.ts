import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppliedJobsPage } from './applied-jobs.page';

describe('AppliedJobsPage', () => {
  let component: AppliedJobsPage;
  let fixture: ComponentFixture<AppliedJobsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedJobsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
