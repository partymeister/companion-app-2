import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeminarPageRoutingModule } from './seminar-routing.module';

import { SeminarPage } from './seminar.page';
import {ConnectivityModule} from "../../modules/connectivity/connectivity.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SeminarPageRoutingModule,
        ConnectivityModule
    ],
  declarations: [SeminarPage]
})
export class SeminarPageModule {}
