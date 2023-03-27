import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {TicketPageRoutingModule} from './ticket-routing.module';

import {TicketPage} from './ticket.page';
import {ConnectivityModule} from '../../modules/connectivity/connectivity.module';
import {QRCodeModule} from "angularx-qrcode";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketPageRoutingModule,
    ReactiveFormsModule,
    ConnectivityModule,
    QRCodeModule

  ],
  declarations: [TicketPage]
})
export class TicketPageModule {
}
