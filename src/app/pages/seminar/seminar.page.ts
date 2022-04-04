import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SeminarItem} from "../../models/seminar_item";
import {SeminarService} from "../../services/seminar.service";
import {VisitorItem} from "../../models/visitor_item";

@Component({
  selector: 'app-seminar',
  templateUrl: './seminar.page.html',
  styleUrls: ['./seminar.page.scss'],
})
export class SeminarPage implements OnInit {

  public seminarItem: SeminarItem;
  private url = '';
  constructor(private seminarService: SeminarService, activatedRoute: ActivatedRoute) {

    this.seminarItem = {
      intro: '',
      speakers: []
    };

    activatedRoute.queryParams.subscribe(params => {
      this.url = params.dataUrl;
      seminarService.getData(this.url)
        .subscribe((data: SeminarItem) => {
          this.seminarItem = data['data'];
          console.log(this.seminarItem);
        });
    });

  }

  openUrl(link) {
    window.location = link;
  }

  ngOnInit() {
  }

  doRefresh($event: any) {
    this.seminarService.getData(this.url)
      .subscribe((data: SeminarItem) => {
        this.seminarItem = data['data'];
        console.log(this.seminarItem);
        setTimeout(() => {
          $event.target.complete();
        }, 1000);
      });
  }
}
