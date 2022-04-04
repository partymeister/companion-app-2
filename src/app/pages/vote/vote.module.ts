import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VotePageRoutingModule } from './vote-routing.module';

import { VotePage } from './vote.page';
import { IonicRatingComponentModule } from 'ionic-rating-component';
import {ConnectivityModule} from "../../modules/connectivity/connectivity.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        VotePageRoutingModule,
        IonicRatingComponentModule,
        ConnectivityModule
    ],
  declarations: [VotePage]
})
export class VotePageModule {}
