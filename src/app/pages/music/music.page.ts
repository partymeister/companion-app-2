import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MusicItem} from "../../models/music_item";
import {MusicService} from "../../services/music.service";

@Component({
  selector: 'app-music',
  templateUrl: './music.page.html',
  styleUrls: ['./music.page.scss'],
})
export class MusicPage implements OnInit {

  public musicItem: MusicItem;
  private url = '';
  loading = false;
  constructor(private musicService: MusicService, activatedRoute: ActivatedRoute) {

    this.musicItem = {
      intro: '',
      artists: []
    };

    activatedRoute.queryParams.subscribe(params => {
      this.url = params.dataUrl;
      musicService.getData(this.url)
        .subscribe((data: MusicItem) => {
          this.musicItem = data;
        });
    });

  }

  openUrl(link) {
    window.location = link;
  }

  ngOnInit() {
  }

  doRefresh($event: any) {
    this.loading = true;
    this.musicService.getData(this.url, true)
      .subscribe((data: MusicItem) => {
        this.musicItem = data;
        setTimeout(() => {
          $event.target.complete();
          this.loading = false;
        }, 1000);
      });
  }
}
