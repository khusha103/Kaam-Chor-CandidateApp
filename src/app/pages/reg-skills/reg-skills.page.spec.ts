import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegSkillsPage } from './reg-skills.page';

describe('RegSkillsPage', () => {
  let component: RegSkillsPage;
  let fixture: ComponentFixture<RegSkillsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegSkillsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
