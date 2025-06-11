import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegReviewPage } from './reg-review.page';

describe('RegReviewPage', () => {
  let component: RegReviewPage;
  let fixture: ComponentFixture<RegReviewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegReviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
