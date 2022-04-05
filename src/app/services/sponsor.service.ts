import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SponsorItem} from "../models/sponsor_item";
import {CacheService} from "./cache.service";
import {map, shareReplay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SponsorService {

  constructor(
    private http: HttpClient,
    private cacheService: CacheService,
  ) {
  }

  getData(url: string, force: boolean = false) {
    let data$;
    if (!force) {
      data$ = this.cacheService.getValue(url);
    }

    if (!data$) {
      console.log("not cached");
      data$ = this.http.get(url).pipe(
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
