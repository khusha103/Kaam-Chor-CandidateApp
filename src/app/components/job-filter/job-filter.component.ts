import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ChangeDetectorRef } from '@angular/core';
import { debounceTime, forkJoin } from 'rxjs';
import { JobFilterService } from 'src/app/services/job-filter.service';

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

interface Job {
  id: string;
  job_title: string;
  job_category: string | number;
  state_id: string | number;
  skills: string;
  experience: string;
  salary: string;
  remote: boolean;
}

interface Filters {
  category: (string | number)[];
  location: (string | number)[];
  skills: (string | number)[];
  jobType: string;
  remote: boolean;
  salary: number;
  experience: { min: string | null; max: string | null };
  keyword: string;
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
    experience: { min: null as string | null, max: null as string | null },
    keyword: '',
  };

  @Input() jobListings: any[] = [];

  filteredJobListings: any[] = [];
  jobs_count: number = 0;

  initialFilters: typeof this.filters;
  jobCategories: CategoryItem[] = [];
  locations: StateItem[] = [];
  skillList: SkillItem[] = [];
  categorySearch: string = '';
  locationSearch: string = '';
  skillSearch: string = '';
  filteredCategories: CategoryItem[] = [];
  filteredLocations: StateItem[] = [];
  filteredSkills: SkillItem[] = [];
  selectedMenu: string = 'category';
  showMoreCategories = false;
  showMoreLocations = false;
  showMoreSkills = false;
  filterCount = 0;
  experienceError = '';

  constructor(
    private modalCtrl: ModalController,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private jobFilterService: JobFilterService,
    private alertController: AlertController
  ) {
    this.initialFilters = JSON.parse(JSON.stringify(this.filters));
  }

  ngOnInit() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') this.dismiss();
    });

    const savedFilters = this.jobFilterService.getFilters();
    if (savedFilters && Object.keys(savedFilters).length > 0) {
      this.filters = JSON.parse(JSON.stringify(savedFilters));
      this.initialFilters = JSON.parse(JSON.stringify(savedFilters));
      this.updateFilterCount();
      this.applyFiltersLogic();
    }

    this.loadFilterData();

    console.log('Received jobListings in JobFilterComponent:', this.jobListings);
    this.filteredJobListings = [...this.jobListings];
    this.jobs_count = this.filteredJobListings.length;

    this.jobFilterService.filters$.pipe(debounceTime(300)).subscribe((filters) => {
      this.applyFiltersLogic();
    });
  }

  loadFilterData() {
    forkJoin({
      categories: this.apiService.getJobCategory(),
      skills: this.apiService.getSkills(),
      states: this.apiService.getStates(),
    }).subscribe({
      next: ({ categories, skills, states }) => {
        this.jobCategories = categories.map((item: any) => ({
          id: item.id,
          category_name: item.category_name || item.name || String(item.id),
        }));
        this.skillList = skills.map((item: any) => ({
          id: item.id,
          value: item.value || item.name || String(item.id),
        }));
        this.locations = states.map((item: any) => ({
          id: item.id,
          name: item.name || String(item.id),
        }));
        this.filteredCategories = [...this.jobCategories];
        this.filteredLocations = [...this.locations];
        this.filteredSkills = [...this.skillList];
        this.applyFiltersLogic();
        this.cdr.detectChanges();
      },
      error: async (err) => {
        console.error('Error loading filter data:', err);
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Failed to load filter options. Please try again later.',
          buttons: ['OK'],
        });
        await alert.present();
        this.jobCategories = [];
        this.skillList = [];
        this.locations = [];
        this.filteredCategories = [];
        this.filteredLocations = [];
        this.filteredSkills = [];
        this.cdr.detectChanges();
      },
    });
  }

  filterCategories(event: any) {
    const query = event.detail.value?.toLowerCase() || '';
    this.filteredCategories = this.jobCategories.filter((category) =>
      category.category_name.toLowerCase().includes(query)
    );
    this.cdr.detectChanges();
  }

  filterLocations(event: any) {
    const query = event.detail.value?.toLowerCase() || '';
    this.filteredLocations = this.locations.filter((loc) =>
      loc.name.toLowerCase().includes(query)
    );
    this.cdr.detectChanges();
  }

  filterSkills(event: any) {
    const query = event.detail.value?.toLowerCase() || '';
    this.filteredSkills = this.skillList.filter((skill) =>
      skill.value.toLowerCase().includes(query)
    );
    this.cdr.detectChanges();
  }

  selectMenu(menu: string) {
    this.selectedMenu = menu;
    this.cdr.detectChanges();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  resetFilters() {
    this.filters = {
      category: [],
      location: [],
      skills: [],
      jobType: '',
      remote: false,
      salary: 0,
      experience: { min: null, max: null },
      keyword: '',
    };
    
    this.jobFilterService.clearFilters();
    
    this.showMoreCategories = false;
    this.showMoreLocations = false;
    this.showMoreSkills = false;
    this.experienceError = '';
    this.categorySearch = '';
    this.locationSearch = '';
    this.skillSearch = '';
    
    this.filteredCategories = [...this.jobCategories];
    this.filteredLocations = [...this.locations];
    this.filteredSkills = [...this.skillList];
    
    this.updateFilterCount();
    this.applyFiltersLogic();
    
    this.cdr.detectChanges();
    
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 0);
  }

  toggleSkill(skillValue: string) {
    const skill = this.skillList.find((s) => s.value === skillValue);
    if (skill) {
      if (this.filters.skills.includes(skill.id)) {
        this.filters.skills = this.filters.skills.filter((s) => s !== skill.id);
      } else {
        this.filters.skills.push(skill.id);
      }
      this.updateFilterCount();
      this.applyFiltersLogic();
    }
  }

  toggleCategory(categoryName: string) {
    const category = this.jobCategories.find((c) => c.category_name === categoryName);
    if (category) {
      if (this.filters.category.includes(category.id)) {
        this.filters.category = this.filters.category.filter((c) => c !== category.id);
      } else {
        this.filters.category.push(category.id);
      }
      this.updateFilterCount();
      this.applyFiltersLogic();
    }
  }

  toggleLocation(stateName: string) {
    const state = this.locations.find((l) => l.name === stateName);
    if (state) {
      if (this.filters.location.includes(state.id)) {
        this.filters.location = this.filters.location.filter((l) => l !== state.id);
      } else {
        this.filters.location.push(state.id);
      }
      this.updateFilterCount();
      this.applyFiltersLogic();
    }
  }

  onSalaryChange(event: any) {
    const value = Number(event.detail.value);
    console.log('Salary changed to:', value, 'Type:', typeof value);
    this.filters.salary = value;
    console.log('Updated filters.salary:', this.filters.salary);
    this.updateFilterCount();
    this.applyFiltersLogic();
    this.cdr.detectChanges();
  }

  onExperienceChange(type: 'min' | 'max', event: any) {
    const value = event.detail.value;
    console.log(`Experience ${type} changed to:`, value, 'Type:', typeof value);
    if (type === 'min') {
      this.filters.experience.min = value === '' ? null : value;
    } else {
      this.filters.experience.max = value === '' ? null : value;
    }
    console.log('Updated filters.experience:', this.filters.experience);
    this.updateFilterCount();
    this.validateFilters();
    this.applyFiltersLogic();
    this.cdr.detectChanges();
  }

  onRemoteChange(event: any) {
    console.log('Remote selected:', this.filters.remote);
    this.updateFilterCount();
    this.applyFiltersLogic();
    this.cdr.detectChanges();
  }

  validateFilters(): boolean {
    this.experienceError = '';
    if (this.filters.experience.min !== null && this.filters.experience.max !== null) {
      const min = this.filters.experience.min === '0' ? 0 : this.filters.experience.min === '30' ? 30 : parseInt(this.filters.experience.min, 10);
      const max = this.filters.experience.max === '30' ? 30 : parseInt(this.filters.experience.max, 10);
      if (min > max) {
        this.experienceError = 'Minimum experience cannot exceed maximum experience';
        return false;
      }
    }
    return true;
  }

  updateFilterCount() {
    this.filterCount = 0;
    this.filterCount += this.getCategoryFilterCount();
    this.filterCount += this.getLocationFilterCount();
    this.filterCount += this.getSkillsFilterCount();
    this.filterCount += this.getJobTypeFilterCount();
    this.filterCount += this.getSalaryFilterCount();
    this.filterCount += this.getExperienceFilterCount();
    this.filterCount += this.getKeywordFilterCount();
    console.log('Filter Count:', this.filterCount, 'JobType:', this.filters.jobType);
    this.cdr.detectChanges();
  }

  formatSalary(salary: number): string {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(salary);
  }

  onKeywordChange(event: any) {
    this.filters.keyword = event.detail.value || '';
    this.updateFilterCount();
    this.applyFiltersLogic();
    this.cdr.detectChanges();
  }

  onJobTypeChange(event: any) {
    const selectedJobType = event.detail.value;
    this.filters.jobType = selectedJobType;
    console.log('EVENT VALUE:', selectedJobType);
    console.log('Job Type selected:', this.filters.jobType);
    this.updateFilterCount();
    this.applyFiltersLogic();
    this.cdr.detectChanges();
  }

  applyFiltersLogic() {
    this.filteredJobListings = this.jobFilterService.filterJobs(this.jobListings, this.filters);
    this.jobs_count = this.filteredJobListings.length;
    this.cdr.detectChanges();
  }

  applyFilters() {
    console.log('Applying filters:', JSON.stringify(this.filters, null, 2));
    if (this.validateFilters()) {
      this.initialFilters = JSON.parse(JSON.stringify(this.filters));
      this.jobFilterService.setFilters(this.filters);
      this.applyFiltersLogic();
      this.modalCtrl.dismiss({ filters: this.filters, filteredJobs: this.filteredJobListings });
    }
  }

  isCategoryChecked(categoryName: string): boolean {
    const category = this.jobCategories.find((c) => c.category_name === categoryName);
    return category ? this.filters.category.includes(category.id) : false;
  }

  isSkillChecked(skillValue: string): boolean {
    const skill = this.skillList.find((s) => s.value === skillValue);
    return skill ? this.filters.skills.includes(skill.id) : false;
  }

  isLocationChecked(stateName: string): boolean {
    const state = this.locations.find((l) => l.name === stateName);
    return state ? this.filters.location.includes(state.id) : false;
  }

  getCategoryFilterCount(): number {
    return this.filters.category ? this.filters.category.length : 0;
  }

  getLocationFilterCount(): number {
    return this.filters.location ? this.filters.location.length : 0;
  }

  getSkillsFilterCount(): number {
    return this.filters.skills ? this.filters.skills.length : 0;
  }

  getJobTypeFilterCount(): number {
    let count = 0;
    if (this.filters.jobType && this.filters.jobType !== '') {
      count++;
    }
    if (this.filters.remote) {
      count++;
    }
    return count;
  }

  getSalaryFilterCount(): number {
    return this.filters.salary && this.filters.salary > 0 ? 1 : 0;
  }

  getExperienceFilterCount(): number {
    let count = 0;
    if (this.filters.experience.min && this.filters.experience.min !== '') {
      count++;
    }
    if (this.filters.experience.max && this.filters.experience.max !== '') {
      count++;
    }
    return count;
  }

  getKeywordFilterCount(): number {
    return this.filters.keyword && this.filters.keyword.trim() !== '' ? 1 : 0;
  }
}