import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StreamPageRoutingModule } from './stream-routing.module';

import { StreamPage } from './stream.page';
import {ConnectivityModule} from "../../modules/connectivity/connectivity.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StreamPageRoutingModule,
    ConnectivityModule
  ],
  declarations: [StreamPage]
})
export class StreamPageModule {}
