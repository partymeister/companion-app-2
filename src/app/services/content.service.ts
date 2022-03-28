import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ContentItem} from "../models/content_item";

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getData(url: string) {
    return this.http.get<ContentItem>(url);
  }}
