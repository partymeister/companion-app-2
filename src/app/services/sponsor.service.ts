import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SponsorItem} from "../models/sponsor_item";

@Injectable({
  providedIn: 'root'
})
export class SponsorService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getData(url: string) {
    return this.http.get<SponsorItem>(url);
  }}
