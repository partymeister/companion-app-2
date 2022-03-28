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

  constructor(contentService: ContentService, activatedRoute: ActivatedRoute) {

    this.contentItem = {
      title: '',
      content: '',
      description: ''
    };

    activatedRoute.queryParams.subscribe(params => {

      contentService.getData(params.dataUrl)
        .subscribe((data: ContentItem) => {
          this.contentItem = data;
          console.log(this.contentItem);
        });
    });

  }

  ngOnInit() {
  }

}
