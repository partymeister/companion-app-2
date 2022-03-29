import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EntryItem} from "../models/entry_item";
import {sprintf} from 'sprintf-js';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getData(url: string, apiKey: string) {
    return this.http.get<EntryItem>(sprintf(url, apiKey));
  }
}
