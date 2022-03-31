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

  constructor(musicService: MusicService, activatedRoute: ActivatedRoute) {

    this.musicItem = {
      intro: '',
      artists: []
    };

    activatedRoute.queryParams.subscribe(params => {

      musicService.getData(params.dataUrl)
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

}
