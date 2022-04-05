import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StreamPageRoutingModule } from './stream-routing.module';

import { StreamPage } from './stream.page';
import {ConnectivityModule} from "../../modules/connectivity/connectivity.module";
import {VjsPlayerComponent} from "../../components/vjs-player.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StreamPageRoutingModule,
    ConnectivityModule
  ],
  declarations: [StreamPage, VjsPlayerComponent]
})
export class StreamPageModule {}
