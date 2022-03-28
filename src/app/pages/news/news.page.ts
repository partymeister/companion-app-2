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

  constructor(newsService: NewsService, activatedRoute: ActivatedRoute) {

    activatedRoute.queryParams.subscribe(params => {
      let url = '';

      if (params.dataUrl === undefined) {
        url = 'https://2022.revision-party.net/blog/index.json';
      } else {
        url = params.dataUrl;
      }

      newsService.getNews(url)
        .subscribe((data: NewsItem) => {
          this.newsItems = [...data['data']];
          console.log(this.newsItems);
        });
    });

  }

  ngOnInit() {
  }

}
