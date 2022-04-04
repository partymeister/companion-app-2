import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TimetableDay} from "../../models/timetable_item";
import {TimetableService} from "../../services/timetable.service";
import {NewsItem} from "../../models/news_item";

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.page.html',
  styleUrls: ['./timetable.page.scss'],
})
export class TimetablePage implements OnInit {

  public timetableDays: TimetableDay[];
  private url = '';

  constructor(private timetableService: TimetableService, activatedRoute: ActivatedRoute) {

    activatedRoute.queryParams.subscribe(params => {
      if (params.dataUrl === undefined) {
        this.url = 'https://2022.revision-party.net/timetable.json';
      } else {
        this.url = params.dataUrl;
      }

      timetableService.getData(this.url)
        .subscribe((data: TimetableDay) => {
          this.timetableDays = [...data['timetable']];
          console.log(this.timetableDays);
        });
    });

  }

  getTimezone() {
    return new Date().toString().substr(new Date().toString().indexOf('GMT'));
  }

  lineBreaks(text: string) {
    const replace = /\n/gi;
    return text.replace(replace, '<br>');
  }

  ngOnInit() {
  }

  doRefresh($event: any) {
    this.timetableService.getData(this.url)
      .subscribe((data: TimetableDay) => {
        this.timetableDays = [...data['timetable']];
        setTimeout(() => {
          $event.target.complete();
        }, 1000);
      });
  }

}
