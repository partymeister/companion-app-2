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

  constructor(seminarService: SeminarService, activatedRoute: ActivatedRoute) {

    this.seminarItem = {
      intro: '',
      seminars: []
    };

    activatedRoute.queryParams.subscribe(params => {

      seminarService.getData(params.dataUrl)
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

}
