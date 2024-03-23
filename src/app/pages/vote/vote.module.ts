import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VotePageRoutingModule } from './vote-routing.module';

import { VotePage } from './vote.page';
import {ConnectivityModule} from "../../modules/connectivity/connectivity.module";
import {IonRatingStarsModule} from "ion-rating-stars";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VotePageRoutingModule,
    ConnectivityModule,
    IonRatingStarsModule
  ],
  declarations: [VotePage]
})
export class VotePageModule {}
