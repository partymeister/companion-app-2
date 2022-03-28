import {Component, OnInit} from '@angular/core';
import {SatelliteService} from "../../services/satellite.service";
import {ActivatedRoute} from "@angular/router";
import {SatelliteItem} from "../../models/satellite_item";

@Component({
  selector: 'app-satellite',
  templateUrl: './satellite.page.html',
  styleUrls: ['./satellite.page.scss'],
})
export class SatellitePage implements OnInit {

  public satelliteItem: SatelliteItem;

  constructor(satelliteService: SatelliteService, activatedRoute: ActivatedRoute) {

    this.satelliteItem = {
      intro: '',
      intro_headline: '',
      outro: '',
      outro_headline: '',
      satellites: []
    };

    activatedRoute.queryParams.subscribe(params => {

      satelliteService.getData(params.dataUrl)
        .subscribe((data: SatelliteItem) => {
          this.satelliteItem = data['data'];
          console.log(this.satelliteItem);
        });
    });

  }

  openUrl(link) {
    window.location = link;
  }

  openEmail(email) {
    // window.location = 'mailto:' + email;
  }

  ngOnInit() {
  }

}
