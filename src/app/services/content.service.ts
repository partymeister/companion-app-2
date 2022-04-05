import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ContentItem} from "../models/content_item";
import {CacheService} from "./cache.service";
import {Observable} from "rxjs";
import {map, shareReplay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(
    private http: HttpClient,
    private cacheService: CacheService,
  ) {
  }

  getData(url: string, force: boolean = false): Observable<ContentItem> {

    let data$;
    if (!force) {
      data$ = this.cacheService.getValue(url);
    }

    if (!data$) {
      console.log("not cached");
      data$ = this.http.get(url).pipe(
        map((response: any) => response),
        shareReplay(1)
      );
      this.cacheService.setValue(data$, url);
    } else {
      console.log("get data from cache");
    }
    return data$;
  }
}
