import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MusicItem} from "../../models/music_item";
import {MusicService} from "../../services/music.service";
import {SeminarItem} from "../../models/seminar_item";

@Component({
  selector: 'app-music',
  templateUrl: './music.page.html',
  styleUrls: ['./music.page.scss'],
})
export class MusicPage implements OnInit {

  public musicItem: MusicItem;
  private url = '';
  constructor(private musicService: MusicService, activatedRoute: ActivatedRoute) {

    this.musicItem = {
      intro: '',
      artists: []
    };

    activatedRoute.queryParams.subscribe(params => {
      this.url = params.dataUrl;
      musicService.getData(this.url)
        .subscribe((data: MusicItem) => {
          this.musicItem = data['data'];
          console.log(this.musicItem);
        });
    });

  }

  openUrl(link) {
    window.location = link;
  }

  ngOnInit() {
  }

  doRefresh($event: any) {
    this.musicService.getData(this.url)
      .subscribe((data: MusicItem) => {
        this.musicItem = data['data'];
        console.log(this.musicItem);
        setTimeout(() => {
          $event.target.complete();
        }, 1000);
      });
  }
}
