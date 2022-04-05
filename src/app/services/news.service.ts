import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NewsItem} from "../models/news_item";
import {Observable} from "rxjs";
import {map, shareReplay} from "rxjs/operators";
import {CacheService} from "./cache.service";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private http: HttpClient,
    private cacheService: CacheService,
  ) {
  }

  getNews(url: string, force: boolean = false): Observable<NewsItem[]> {

    let news$;
    if (!force) {
      news$ = this.cacheService.getValue(url);
    }

    if (!news$) {
      console.log("not cached");
      news$ = this.http.get(url).pipe(
        map((response: any) => response.data),
        shareReplay(1)
      );
      this.cacheService.setValue(news$, url);
    } else {
      console.log("get data from cache");
    }
    return news$;
  }
}
