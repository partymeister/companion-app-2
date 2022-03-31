import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EntryItem} from "../models/entry_item";
import {sprintf} from 'sprintf-js';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getEntries(url: string, apiToken: string) {
    return this.http.get<EntryItem>(sprintf(url + 'entries', apiToken));
  }

}
