import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EntryItem} from "../models/entry_item";
import {sprintf} from 'sprintf-js';
import {Observable} from "rxjs";
import {ContentItem} from "../models/content_item";
import {map, shareReplay} from "rxjs/operators";
import {CacheService} from "./cache.service";

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(
    private http: HttpClient,
    private cacheService: CacheService,
  ) {
  }

  getData(url: string, apiToken: string, force: boolean = false): Observable<EntryItem[]> {

    let data$;
    if (!force) {
      data$ = this.cacheService.getValue(url);
    }

    if (!data$) {
      console.log("not cached");
      data$ = this.http.get(sprintf(url, apiToken)).pipe(
        map((response: any) => response.data),
        shareReplay(1)
      );
      this.cacheService.setValue(data$, url);
    } else {
      console.log("get data from cache");
    }
    return data$;
  }
}
