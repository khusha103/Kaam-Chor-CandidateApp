import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-job-filter',
  templateUrl: './job-filter.component.html',
  styleUrls: ['./job-filter.component.scss'],
})
export class JobFilterComponent implements OnInit {
  filters = {
    category: [] as string[],
    location: [] as string[],
    skills: [] as string[],
    jobType: '',
    remote: false,
    salary: 0,
    experience: { min: null as number | null, max: null as number | null }
  };

  initialFilters: typeof this.filters;
  jobCategories = [
    'Software Engineer',
    'Designer',
    'Product Manager',
    'Sales',
    'Data Scientist',
    'DevOps Engineer',
    'Marketing Specialist',
    'Business Analyst',
    'QA Engineer',
    'UX Researcher',
    'Customer Success Manager',
    'Technical Writer'
  ];
  locations = [
    'New York',
    'London',
    'Bangalore',
    'Remote',
    'San Francisco',
    'Singapore',
    'Toronto',
    'Berlin',
    'Sydney',
    'Tokyo',
    'Dubai',
    'Austin'
  ];
  skillList = [
    'JavaScript',
    'Python',
    'Angular',
    'Ionic',
    'SQL',
    'React',
    'Node.js',
    'Java',
    'C++',
    'TypeScript',
    'AWS',
    'Docker',
    'Agile Methodology',
    'UI/UX Design',
    'Data Analysis'
  ];
  experienceYears = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  selectedMenu: string = 'category';
  showMoreCategories = false;
  showMoreLocations = false;
  filterCount = 0;
  experienceError = '';

  constructor(private modalCtrl: ModalController) {
    this.initialFilters = JSON.parse(JSON.stringify(this.filters));
  }

  ngOnInit() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') this.dismiss();
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

  toggleSkill(skill: string) {
    if (this.filters.skills.includes(skill)) {
      this.filters.skills = this.filters.skills.filter(s => s !== skill);
    } else {
      this.filters.skills.push(skill);
    }
    this.updateFilterCount();
  }

  toggleCategory(category: string) {
    if (this.filters.category.includes(category)) {
      this.filters.category = this.filters.category.filter(c => c !== category);
    } else {
      this.filters.category.push(category);
    }
    this.updateFilterCount();
  }

  toggleLocation(location: string) {
    if (this.filters.location.includes(location)) {
      this.filters.location = this.filters.location.filter(l => l !== location);
    } else {
      this.filters.location.push(location);
    }
    this.updateFilterCount();
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
}