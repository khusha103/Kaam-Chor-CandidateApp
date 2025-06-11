import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

interface CategoryItem {
  id: number | string;
  category_name: string;
}

interface SkillItem {
  id: number | string;
  value: string;
}

interface StateItem {
  id: number | string;
  name: string;
}

@Component({
  selector: 'app-job-filter',
  templateUrl: './job-filter.component.html',
  styleUrls: ['./job-filter.component.scss'],
})
export class JobFilterComponent implements OnInit {
  filters = {
    category: [] as (number | string)[],
    location: [] as (number | string)[],
    skills: [] as (number | string)[],
    jobType: '',
    remote: false,
    salary: 0,
    experience: { min: null as number | null, max: null as number | null }
  };

  initialFilters: typeof this.filters;
  jobCategories: CategoryItem[] = [];
  locations: StateItem[] = [];
  skillList: SkillItem[] = [];
  experienceYears = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  selectedMenu: string = 'category';
  showMoreCategories = false;
  showMoreLocations = false;
  filterCount = 0;
  experienceError = '';

  constructor(
    private modalCtrl: ModalController,
    private apiService: ApiService
  ) {
    this.initialFilters = JSON.parse(JSON.stringify(this.filters));
  }

  ngOnInit() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') this.dismiss();
    });

    this.loadFilterData();
  }

  loadFilterData() {
    forkJoin({
      categories: this.apiService.getJobCategory(),
      skills: this.apiService.getSkills(),
      states: this.apiService.getStates()
    }).subscribe({
      next: ({ categories, skills, states }) => {
        this.jobCategories = categories.map((item: any) => ({
          id: item.id,
          category_name: item.category_name || item.name || String(item.id)
        }));
        this.skillList = skills.map((item: any) => ({
          id: item.id,
          value: item.value || item.name || String(item.id)
        }));
        this.locations = states.map((item: any) => ({
          id: item.id,
          name: item.name || String(item.id)
        }));
      },
      error: (err) => {
        console.error('Error loading filter data:', err);
        this.jobCategories = [
          { id: 1, category_name: 'Software Engineer' },
          { id: 2, category_name: 'Designer' }
        ];
        this.skillList = [
          { id: 1, value: 'JavaScript' },
          { id: 2, value: 'Python' }
        ];
        this.locations = [
          { id: 1, name: 'NY' },
          { id: 2, name: 'CA' }
        ];
      }
    });
  }

  selectMenu(menu: string) {
    this.selectedMenu = menu;
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  resetFilters() {
    this.filters = JSON.parse(JSON.stringify(this.initialFilters));
    this.showMoreCategories = false;
    this.showMoreLocations = false;
    this.experienceError = '';
    this.updateFilterCount();
  }

  applyFilters() {
    if (this.validateFilters()) {
      this.initialFilters = JSON.parse(JSON.stringify(this.filters));
      this.modalCtrl.dismiss(this.filters);
    }
  }

  toggleSkill(skillValue: string) {
    const skill = this.skillList.find(s => s.value === skillValue);
    if (skill) {
      if (this.filters.skills.includes(skill.id)) {
        this.filters.skills = this.filters.skills.filter(s => s !== skill.id);
      } else {
        this.filters.skills.push(skill.id);
      }
      this.updateFilterCount();
    }
  }

  toggleCategory(categoryName: string) {
    const category = this.jobCategories.find(c => c.category_name === categoryName);
    if (category) {
      if (this.filters.category.includes(category.id)) {
        this.filters.category = this.filters.category.filter(c => c !== category.id);
      } else {
        this.filters.category.push(category.id);
      }
      this.updateFilterCount();
    }
  }

  toggleLocation(stateName: string) {
    const state = this.locations.find(l => l.name === stateName);
    if (state) {
      if (this.filters.location.includes(state.id)) {
        this.filters.location = this.filters.location.filter(l => l !== state.id);
      } else {
        this.filters.location.push(state.id);
      }
      this.updateFilterCount();
    }
  }

  validateFilters(): boolean {
    this.experienceError = '';
    if (this.filters.experience.min !== null && this.filters.experience.max !== null && this.filters.experience.min > this.filters.experience.max) {
      this.experienceError = 'Min cannot exceed max';
      return false;
    }
    return true;
  }

  updateFilterCount() {
    this.filterCount = 0;
    this.filterCount += this.filters.category.length;
    this.filterCount += this.filters.location.length;
    this.filterCount += this.filters.skills.length;
    if (this.filters.jobType) this.filterCount++;
    if (this.filters.remote) this.filterCount++;
    if (this.filters.salary > 0) this.filterCount++;
    if (this.filters.experience.min !== null) this.filterCount++;
    if (this.filters.experience.max !== null) this.filterCount++;
  }

  formatSalary(salary: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(salary);
  }

  isCategoryChecked(categoryName: string): boolean {
    const category = this.jobCategories.find(c => c.category_name === categoryName);
    return category ? this.filters.category.includes(category.id) : false;
  }

  isSkillChecked(skillValue: string): boolean {
    const skill = this.skillList.find(s => s.value === skillValue);
    return skill ? this.filters.skills.includes(skill.id) : false;
  }

  isLocationChecked(stateName: string): boolean {
    const state = this.locations.find(l => l.name === stateName);
    return state ? this.filters.location.includes(state.id) : false;
  }
}