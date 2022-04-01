import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SponsorItem} from "../../models/sponsor_item";
import {SponsorService} from "../../services/sponsor.service";

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.page.html',
  styleUrls: ['./sponsor.page.scss'],
})
export class SponsorPage implements OnInit {

  public sponsorItem: SponsorItem;

  constructor(sponsorService: SponsorService, activatedRoute: ActivatedRoute) {

    this.sponsorItem = {
      outro: '',
      outro_headline: '',
      supporter_headline: '',
      supporters: '',
      sponsors: []
    };

    activatedRoute.queryParams.subscribe(params => {

      sponsorService.getData(params.dataUrl)
        .subscribe((data: SponsorItem) => {
          this.sponsorItem = data['data'];
          console.log(this.sponsorItem);
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
