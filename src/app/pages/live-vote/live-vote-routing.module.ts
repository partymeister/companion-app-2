import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiveVotePage } from './live-vote.page';

const routes: Routes = [
  {
    path: '',
    component: LiveVotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiveVotePageRoutingModule {}
