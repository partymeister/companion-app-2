import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SeminarItem} from "../../models/seminar_item";
import {SeminarService} from "../../services/seminar.service";

@Component({
  selector: 'app-seminar',
  templateUrl: './seminar.page.html',
  styleUrls: ['./seminar.page.scss'],
})
export class SeminarPage implements OnInit {

  public seminarItem: SeminarItem;
  private url = '';
  loading = false;
  constructor(private seminarService: SeminarService, activatedRoute: ActivatedRoute) {

    this.seminarItem = {
      intro: '',
      speakers: []
    };

    activatedRoute.queryParams.subscribe(params => {
      this.url = params.dataUrl;
      seminarService.getData(this.url)
        .subscribe((data: SeminarItem) => {
          this.seminarItem = data;
        });
    });

  }

  openUrl(link) {
    window.location = link;
  }

  ngOnInit() {
  }

  doRefresh($event: any) {
    this.loading = true;
    this.seminarService.getData(this.url, true)
      .subscribe((data: SeminarItem) => {
        this.seminarItem = data;
        setTimeout(() => {
          $event.target.complete();
          this.loading = false;
        }, 1000);
      });
  }
}
