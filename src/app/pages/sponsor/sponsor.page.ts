import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SponsorItem} from "../../models/sponsor_item";
import {SponsorService} from "../../services/sponsor.service";
import {ContentItem} from "../../models/content_item";

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.page.html',
  styleUrls: ['./sponsor.page.scss'],
})
export class SponsorPage implements OnInit {

  public sponsorItem: SponsorItem;
  private url = '';
  constructor(private sponsorService: SponsorService, activatedRoute: ActivatedRoute) {

    this.sponsorItem = {
      outro: '',
      outro_headline: '',
      supporter_headline: '',
      supporters: '',
      sponsors: []
    };

    activatedRoute.queryParams.subscribe(params => {
      this.url = params.dataUrl;
      sponsorService.getData(this.url)
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

  doRefresh($event: any) {
    this.sponsorService.getData(this.url)
      .subscribe((data: SponsorItem) => {
        this.sponsorItem = data['data'];
        console.log(this.sponsorItem);
        setTimeout(() => {
          $event.target.complete();
        }, 1000);
      });
  }
}
