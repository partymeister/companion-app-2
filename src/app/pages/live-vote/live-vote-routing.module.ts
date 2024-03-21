import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonRatingStarsModule } from 'ion-rating-stars';


import { LiveVotePage } from './live-vote.page';

const routes: Routes = [
  {
    path: '',
    component: LiveVotePage
  }
];

@NgModule({
  imports: [IonRatingStarsModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiveVotePageRoutingModule {}
