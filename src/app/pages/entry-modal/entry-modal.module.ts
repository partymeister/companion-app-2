import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntryModalPageRoutingModule } from './entry-modal-routing.module';

import { EntryModalPage } from './entry-modal.page';
import {ConnectivityModule} from "../../modules/connectivity/connectivity.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EntryModalPageRoutingModule,
        ConnectivityModule
    ],
  declarations: [EntryModalPage]
})
export class EntryModalPageModule {}
