import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SatellitePageRoutingModule } from './satellite-routing.module';

import { SatellitePage } from './satellite.page';
import {ConnectivityModule} from "../../modules/connectivity/connectivity.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SatellitePageRoutingModule,
        ConnectivityModule
    ],
  declarations: [SatellitePage]
})
export class SatellitePageModule {}
