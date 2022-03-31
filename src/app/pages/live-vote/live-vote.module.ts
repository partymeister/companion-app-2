import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiveVotePageRoutingModule } from './live-vote-routing.module';

import { LiveVotePage } from './live-vote.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LiveVotePageRoutingModule
  ],
  declarations: [LiveVotePage]
})
export class LiveVotePageModule {}
