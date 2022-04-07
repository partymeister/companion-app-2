import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TimetableDay} from "../../models/timetable_item";
import {TimetableService} from "../../services/timetable.service";
import * as moment from 'moment';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.page.html',
  styleUrls: ['./timetable.page.scss'],
})
export class TimetablePage implements OnInit {

  public timetableDays: TimetableDay[];
  private url = '';
  loading = false;

  constructor(private timetableService: TimetableService, activatedRoute: ActivatedRoute) {

    activatedRoute.queryParams.subscribe(params => {
      if (params.dataUrl === undefined) {
        this.url = 'https://2022.revision-party.net/timetable.json';
      } else {
        this.url = params.dataUrl;
      }

      timetableService.getData(this.url)
        .subscribe((data: TimetableDay[]) => {
          this.timetableDays = data;
        });
    });

  }

  getTimezone() {
    return new Date().toString().substr(new Date().toString().indexOf('GMT'));
  }

  currentTime() {

    const currentTime = moment();

    return currentTime.format('MMMM DD, HH:mm');
  }

  getCurrentEvent() {

    // const currentTime = new Date('2022-04-15T16:01:00');
    const currentTime = new Date();

    const currentEvents = [];

    this.timetableDays.forEach((day, dayIndex) => {
      day.events.forEach((event, eventIndex) => {
        const eventTime = new Date(event['start']);

        if (event['category'].toLowerCase() !== 'deadline' && eventTime < currentTime) {
          currentEvents.push(event);
        }
      });
    });

    if (currentEvents.length > 0) {
      return currentEvents.slice(-1).pop();
    }
    return false;
  }

  lineBreaks(text: string) {
    const replace = /\n/gi;
    return text.replace(replace, '<br>');
  }

  ngOnInit() {
  }

  doRefresh($event: any) {
    this.loading = true;
    this.timetableService.getData(this.url, true)
      .subscribe((data: TimetableDay[]) => {
        this.timetableDays = data;
        setTimeout(() => {
          $event.target.complete();
          this.loading = false;
        }, 1000);
      });
  }

}
