import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TimetableDay} from "../../models/timetable_item";
import {TimetableService} from "../../services/timetable.service";

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.page.html',
  styleUrls: ['./timetable.page.scss'],
})
export class TimetablePage implements OnInit {

  public timetableDays: TimetableDay[];

  constructor(timetableService: TimetableService, activatedRoute: ActivatedRoute) {

    activatedRoute.queryParams.subscribe(params => {
      let url = '';

      if (params.dataUrl === undefined) {
        url = 'https://2022.revision-party.net/timetable.json';
      } else {
        url = params.dataUrl;
      }

      timetableService.getData(url)
        .subscribe((data: TimetableDay) => {
          this.timetableDays = [...data['timetable']];
          console.log(this.timetableDays);
        });
    });

  }

  lineBreaks(text: string) {
    const replace = /\n/gi;
    return text.replace(replace, '<br>');
  }

  ngOnInit() {
  }

}
