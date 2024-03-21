import {Component, OnInit} from '@angular/core';
import {NewsItem} from "../../models/news_item";
import {NewsService} from "../../services/news.service";
import {ActivatedRoute} from "@angular/router";
import {StorageService} from "../../services/storage.service";
import * as moment from 'moment';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  public newsItems: NewsItem[] = [];
  private url = '';
  loading = false;
  public moment;

  constructor(private newsService: NewsService, activatedRoute: ActivatedRoute) {

    this.moment = moment;

    activatedRoute.queryParams.subscribe(params => {

      if (params.dataUrl === undefined) {
        this.url = 'https://2024.revision-party.net/blog/index.json';
      } else {
        this.url = params.dataUrl;
      }

      newsService.getNews(this.url)
        .subscribe((data: NewsItem[]) => {
          this.newsItems = data;
        });
    });

  }

  ngOnInit() {
  }

  async doRefresh($event: any) {
    this.loading = true;

    this.newsService.getNews(this.url, true)
      .subscribe((data: NewsItem[]) => {
        this.newsItems = data;
        setTimeout(() => {
          $event.target.complete();
          this.loading = false;
        }, 1000);
      });
  }
}
