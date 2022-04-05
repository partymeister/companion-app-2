import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StreamService} from "../../services/stream.service";
import {StreamItem} from "../../models/stream_item";
import Hls from "hls.js";

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
          setTimeout(() => {
            this.initVideoStreams();
          }, 1000);
        });
    });

  }

  initVideoStreams() {

    this.streamItems.forEach((stream, index) => {
      const video = document.getElementById('player_' + index) as HTMLMediaElement;
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(stream.url);
        hls.attachMedia(video);
        console.log("Not Safari");
      }
        // HLS.js is not supported on platforms that do not have Media Source
        // Extensions (MSE) enabled.
        //
        // When the browser has built-in HLS support (check using `canPlayType`),
        // we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video
        // element through the `src` property. This is using the built-in support
        // of the plain video element, without using HLS.js.
        //
        // Note: it would be more normal to wait on the 'canplay' event below however
        // on Safari (where you are most likely to find built-in HLS support) the
        // video.src URL must be on the user-driven white-list before a 'canplay'
        // event will be emitted; the last video event that can be reliably
      // listened-for when the URL is not on the white-list is 'loadedmetadata'.
      else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        console.log("Probably Safari");
        video.src = stream.url;
      }
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
          this.initVideoStreams();
        }, 1000);
        setTimeout(() => {
          $event.target.complete();
          this.loading = false;
        }, 1000);
      });
  }
}
