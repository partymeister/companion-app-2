import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {TicketModalPageRoutingModule} from './ticket-modal-routing.module';

import {TicketModalPage} from './ticket-modal.page';
import {ConnectivityModule} from '../../modules/connectivity/connectivity.module';
import {QRCodeModule} from "angularx-qrcode";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketModalPageRoutingModule,
    ConnectivityModule,
    QRCodeModule
  ],
  declarations: [TicketModalPage]
})
export class TicketModalPageModule {
}
