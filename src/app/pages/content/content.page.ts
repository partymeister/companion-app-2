import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ContentItem} from "../../models/content_item";
import {ContentService} from "../../services/content.service";

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
})
export class ContentPage implements OnInit {

  public contentItem: ContentItem;
  private url = '';
  loading = false;
  constructor(private contentService: ContentService, activatedRoute: ActivatedRoute) {

    this.contentItem = {
      title: '',
      content: '',
      description: ''
    };

    activatedRoute.queryParams.subscribe(params => {
      this.url = params.dataUrl;
      contentService.getData(this.url)
        .subscribe((data: ContentItem) => {
          this.contentItem = data;
        });
    });

  }

  ngOnInit() {
  }

  doRefresh($event: any) {
    this.loading = true;
    this.contentService.getData(this.url, true)
      .subscribe((data) => {
        this.contentItem = data;
        setTimeout(() => {
          $event.target.complete();
          this.loading = false;
        }, 1000);
      });
  }
}
