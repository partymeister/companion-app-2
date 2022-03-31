import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SeminarItem} from "../models/seminar_item";

@Injectable({
  providedIn: 'root'
})
export class SeminarService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getData(url: string) {
    return this.http.get<SeminarItem>(url);
  }}
