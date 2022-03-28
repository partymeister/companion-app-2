import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NewsItem} from "../models/news_item";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getNews(url: string) {
    return this.http.get<NewsItem>(url);
  }
}
