import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Testpage1Page } from './testpage-1.page';

describe('Testpage1Page', () => {
  let component: Testpage1Page;
  let fixture: ComponentFixture<Testpage1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Testpage1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
