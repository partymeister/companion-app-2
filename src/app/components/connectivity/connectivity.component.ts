import { Component, OnInit } from '@angular/core';
import {ConnectionStatus, Network} from '@capacitor/network';


@Component({
  selector: 'app-connectivity',
  templateUrl: './connectivity.component.html',
  styleUrls: ['./connectivity.component.scss'],
})
export class ConnectivityComponent implements OnInit {

  public isOnline: boolean;
  constructor() {
  }

  ngOnInit() {
    Network.addListener('networkStatusChange', status => {
      this.isOnline = status.connected;
    });
    Network.getStatus().then(networkState => {
      this.isOnline = networkState.connected;
    });
  }

}
