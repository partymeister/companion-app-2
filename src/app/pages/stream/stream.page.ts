import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StreamService} from "../../services/stream.service";
import {StreamItem} from "../../models/stream_item";

@Component({
  selector: 'app-stream',
  templateUrl: './stream.page.html',
  styleUrls: ['./stream.page.scss'],
})
export class StreamPage implements OnInit {

  public streamItems: StreamItem[];
  private url = '';
  loading = false;

  constructor(private streamService: StreamService, activatedRoute: ActivatedRoute) {

    activatedRoute.queryParams.subscribe(params => {

      this.url = params.dataUrl;
      streamService.getData(this.url)
        .subscribe((data: StreamItem[]) => {
          this.streamItems = data;
        });
    });

  }

  ngOnInit() {
  }

  async doRefresh($event: any) {
    this.loading = true;

    this.streamService.getData(this.url, true)
      .subscribe((data: StreamItem[]) => {
        this.streamItems = data;
        setTimeout(() => {
          $event.target.complete();
          this.loading = false;
        }, 1000);
      });
  }
}
