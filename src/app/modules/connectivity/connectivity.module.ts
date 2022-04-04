import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConnectivityComponent} from '../../components/connectivity/connectivity.component';
import {IonicModule} from "@ionic/angular";



@NgModule({
  declarations: [
    ConnectivityComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ConnectivityComponent
  ],
})
export class ConnectivityModule { }
