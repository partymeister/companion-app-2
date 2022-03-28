import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TimetableDay} from "../models/timetable_item";

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getData(url: string) {
    return this.http.get<TimetableDay>(url);
  }
}
