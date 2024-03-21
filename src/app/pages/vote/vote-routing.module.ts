import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonRatingStarsModule } from 'ion-rating-stars';

import { VotePage } from './vote.page';

const routes: Routes = [
  {
    path: '',
    component: VotePage
  }
];

@NgModule({
  imports: [IonRatingStarsModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VotePageRoutingModule {}
