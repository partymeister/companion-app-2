import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SponsorPageRoutingModule } from './sponsor-routing.module';

import { SponsorPage } from './sponsor.page';
import {ConnectivityModule} from "../../modules/connectivity/connectivity.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SponsorPageRoutingModule,
        ConnectivityModule
    ],
  declarations: [SponsorPage]
})
export class SponsorPageModule {}
