import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'NewsPage',
    pathMatch: 'full'
  },
  {
    path: 'NewsPage',
    loadChildren: () => import('./pages/news/news.module').then( m => m.NewsPageModule)
  },
  {
    path: 'NewsPage/:index',
    loadChildren: () => import('./pages/news/news.module').then( m => m.NewsPageModule)
  },
  {
    path: 'ContentPage/:index',
    loadChildren: () => import('./pages/content/content.module').then( m => m.ContentPageModule)
  },
  {
    path: 'SatellitePage/:index',
    loadChildren: () => import('./pages/satellite/satellite.module').then( m => m.SatellitePageModule)
  },
  {
    path: 'SponsorPage/:index',
    loadChildren: () => import('./pages/sponsor/sponsor.module').then( m => m.SponsorPageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'intro/:index',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'TimetablePage/:index',
    loadChildren: () => import('./pages/timetable/timetable.module').then( m => m.TimetablePageModule)
  },
  {
    path: 'VisitorPage/:index',
    loadChildren: () => import('./pages/visitor/visitor.module').then( m => m.VisitorPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
