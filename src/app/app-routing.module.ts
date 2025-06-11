import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./home-tab/home-tab.module').then(m => m.HomeTabPageModule)
  // }
  {
    path: '',
    loadChildren: () => import('./pages/splash-screen/splash-screen.module').then(m => m.SplashScreenPageModule)
  }
  ,{
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  // {
  //   path: 'otp-verf',
  //   loadChildren: () => import('./otp-verf/otp-verf.module').then( m => m.OtpVerfPageModule)
  // },
  {
    path: 'otp-verf',
    loadChildren: () => import('./pages/otp-verf/otp-verf.module').then( m => m.OtpVerfPageModule)
  },
  
  {
    path: 'home-tab',
    loadChildren: () => import('./home-tab/home-tab.module').then( m => m.HomeTabPageModule)
  },
  {
    path: 'jobs-tab',
    loadChildren: () => import('./jobs-tab/jobs-tab.module').then( m => m.JobsTabPageModule)
  },
  {
    path: 'explore-tab',
    loadChildren: () => import('./explore-tab/explore-tab.module').then( m => m.ExploreTabPageModule)
  },
  {
    path: 'profile-tab',
    loadChildren: () => import('./profile-tab/profile-tab.module').then( m => m.ProfileTabPageModule)
  },
  {
    path: 'reg-aboutme',
    loadChildren: () => import('./pages/reg-aboutme/reg-aboutme.module').then( m => m.RegAboutmePageModule)
  },
  {
    path: 'reg-education',
    loadChildren: () => import('./pages/reg-education/reg-education.module').then( m => m.RegEducationPageModule)
  },
  {
    path: 'reg-experience',
    loadChildren: () => import('./pages/reg-experience/reg-experience.module').then( m => m.RegExperiencePageModule)
  },
  {
    path: 'reg-skills',
    loadChildren: () => import('./pages/reg-skills/reg-skills.module').then( m => m.RegSkillsPageModule)
  },
  {
    path: 'reg-review',
    loadChildren: () => import('./pages/reg-review/reg-review.module').then( m => m.RegReviewPageModule)
  },
  {
    path: 'splash-screen',
    loadChildren: () => import('./pages/splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
  },
  {
    path: 'testpage-1',
    loadChildren: () => import('./testing/testpage-1/testpage-1.module').then( m => m.Testpage1PageModule)
  },
  {
    path: 'upload',
    loadChildren: () => import('./testing/upload/upload.module').then( m => m.UploadPageModule)
  },
  {
    path: 'job-detail',
    loadChildren: () => import('./pages/job-detail/job-detail.module').then( m => m.JobDetailPageModule)
  },
  {
    path: 'applied-jobs',
    loadChildren: () => import('./pages/applied-jobs/applied-jobs.module').then( m => m.AppliedJobsPageModule)
  },
  {
    path: 'saved-jobs',
    loadChildren: () => import('./pages/saved-jobs/saved-jobs.module').then( m => m.SavedJobsPageModule)
  },
  {
    path: 'job-detail/:id',
    loadChildren: () => import('./pages/job-detail/job-detail.module').then(m => m.JobDetailPageModule)
  },
  {
    path: 'applied-saved-jobs',
    loadChildren: () => import('./pages/applied-saved-jobs/applied-saved-jobs.module').then( m => m.AppliedSavedJobsPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./sampletest/test/test.module').then( m => m.TestPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
