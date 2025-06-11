// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { TabsPage } from './tabs.page';

// const routes: Routes = [
//   {
//     path: 'tabs',
//     component: TabsPage,
//     children: [
//       {
//         path: 'home',
//         loadChildren: () => import('../home-tab/home-tab.module').then(m => m.HomeTabPageModule)
//       },
//       {
//         path: 'jobs',
//         loadChildren: () => import('../jobs-tab/jobs-tab.module').then(m => m.JobsTabPageModule)
//       },
//       {
//         path: 'explore',
//         loadChildren: () => import('../explore-tab/explore-tab.module').then(m => m.ExploreTabPageModule)
//       },
//       {
//         path: 'profile',
//         loadChildren: () => import('../profile-tab/profile-tab.module').then(m => m.ProfileTabPageModule)
//       },
//       {
//         path: '',
//         redirectTo: '/tabs/home',
//         pathMatch: 'full'
//       }
//     ]
//   },
//   {
//     path: '',
//     redirectTo: '/tabs/home',
//     pathMatch: 'full'
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
// })
// export class TabsPageRoutingModule {}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home-tab/home-tab.module').then(m => m.HomeTabPageModule)
      },
      {
        path: 'jobs',
        loadChildren: () => import('../jobs-tab/jobs-tab.module').then(m => m.JobsTabPageModule)
      },
      {
        path: 'explore',
        loadChildren: () => import('../explore-tab/explore-tab.module').then(m => m.ExploreTabPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile-tab/profile-tab.module').then(m => m.ProfileTabPageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}