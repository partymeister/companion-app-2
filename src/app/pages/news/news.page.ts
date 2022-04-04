import { Component, OnInit } from '@angular/core';
import {NewsItem} from "../../models/news_item";
import {NewsService} from "../../services/news.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  public newsItems: NewsItem[];
  private url = '';
  constructor(private newsService: NewsService, activatedRoute: ActivatedRoute) {

    activatedRoute.queryParams.subscribe(params => {

      if (params.dataUrl === undefined) {
        this.url = 'https://2022.revision-party.net/blog/index.json';
      } else {
        this.url = params.dataUrl;
      }

      newsService.getNews(this.url)
        .subscribe((data: NewsItem) => {
          this.newsItems = [...data['data']];
          console.log(this.newsItems);
        });
    });

  }

  ngOnInit() {
  }

  doRefresh($event: any) {
    this.newsService.getNews(this.url)
      .subscribe((data: NewsItem) => {
        this.newsItems = [...data['data']];
        setTimeout(() => {
          $event.target.complete();
        }, 1000);
      });
  }
}
