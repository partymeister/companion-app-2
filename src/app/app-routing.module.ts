import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {IntroGuard} from './guards/intro.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'TimetablePage',
    pathMatch: 'full'
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule),
  },
  {
    path: 'intro/:index',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule),
  },
  {
    path: 'NewsPage',
    loadChildren: () => import('./pages/news/news.module').then( m => m.NewsPageModule),
    canActivate:[IntroGuard],
  },
  {
    path: 'NewsPage/:index',
    loadChildren: () => import('./pages/news/news.module').then( m => m.NewsPageModule),
    canActivate:[IntroGuard],
  },
  {
    path: 'ContentPage/:index',
    loadChildren: () => import('./pages/content/content.module').then( m => m.ContentPageModule),
    canActivate:[IntroGuard],
  },
  {
    path: 'SatellitePage/:index',
    loadChildren: () => import('./pages/satellite/satellite.module').then( m => m.SatellitePageModule),
    canActivate:[IntroGuard],
  },
  {
    path: 'SponsorPage/:index',
    loadChildren: () => import('./pages/sponsor/sponsor.module').then( m => m.SponsorPageModule),
    canActivate:[IntroGuard],
  },
  {
    path: 'TimetablePage',
    loadChildren: () => import('./pages/timetable/timetable.module').then( m => m.TimetablePageModule),
    canActivate:[IntroGuard],
  },
  {
    path: 'TimetablePage/:index',
    loadChildren: () => import('./pages/timetable/timetable.module').then( m => m.TimetablePageModule),
    canActivate:[IntroGuard],
  },
  {
    path: 'VisitorPage/:index',
    loadChildren: () => import('./pages/visitor/visitor.module').then( m => m.VisitorPageModule),
    canActivate:[IntroGuard],
  },
  {
    path: 'LoginPage/:index',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate:[IntroGuard],
  },
  {
    path: 'LogoutPage/:index',
    loadChildren: () => import('./pages/logout/logout.module').then( m => m.LogoutPageModule),
    canActivate:[IntroGuard],
  },
  {
    path: 'EntryPage/:index',
    loadChildren: () => import('./pages/entry/entry.module').then( m => m.EntryPageModule),
    canActivate:[IntroGuard],
  },
  {
    path: 'entry-modal',
    loadChildren: () => import('./pages/entry-modal/entry-modal.module').then( m => m.EntryModalPageModule),
    canActivate:[IntroGuard],
  },
  {
    path: 'TicketPage/:index',
    loadChildren: () => import('./pages/ticket/ticket.module').then( m => m.TicketPageModule),
    canActivate:[IntroGuard],
  },
  {
    path: 'ticket-modal',
    loadChildren: () => import('./pages/ticket-modal/ticket-modal.module').then( m => m.TicketModalPageModule),
    canActivate:[IntroGuard],
  },
  {
    path: 'LiveVotePage/:index',
    loadChildren: () => import('./pages/live-vote/live-vote.module').then( m => m.LiveVotePageModule),
    canActivate:[IntroGuard],
  },
  {
    path: 'VotePage/:index',
    loadChildren: () => import('./pages/vote/vote.module').then( m => m.VotePageModule),
    canActivate:[IntroGuard],
  },
  {
    path: 'MusicPage/:index',
    loadChildren: () => import('./pages/music/music.module').then( m => m.MusicPageModule),
    canActivate:[IntroGuard],
  },
  {
    path: 'SeminarPage/:index',
    loadChildren: () => import('./pages/seminar/seminar.module').then( m => m.SeminarPageModule),
    canActivate:[IntroGuard],
  },
  {
    path: 'StreamPage',
    loadChildren: () => import('./pages/stream/stream.module').then( m => m.StreamPageModule)
  },
  {
    path: 'StreamPage/:index',
    loadChildren: () => import('./pages/stream/stream.module').then( m => m.StreamPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
