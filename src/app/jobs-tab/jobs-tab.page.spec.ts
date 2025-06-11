import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobsTabPage } from './jobs-tab.page';

describe('JobsTabPage', () => {
  let component: JobsTabPage;
  let fixture: ComponentFixture<JobsTabPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
