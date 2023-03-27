import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {sprintf} from 'sprintf-js';
import {VoteEntryItem} from "../models/vote_entry_item";
import {ToastController} from "@ionic/angular";
import {empty, interval, Observable} from 'rxjs';
import {CacheService} from "./cache.service";
import {map, shareReplay} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private cacheService: CacheService,
  ) {
  }

  getEntries(url: string, apiToken: string, force: boolean = false) {
    let data$;
    if (!force) {
      data$ = this.cacheService.getValue(url);
    }

    if (!data$) {
      console.log("not cached");
      data$ = this.http.get(sprintf(url + 'entries', apiToken)).pipe(
        map((response: any) => response.data),
        shareReplay(1)
      );
      this.cacheService.setValue(data$, url);
    } else {
      console.log("get data from cache");
    }
    return data$;
  }


  getLiveVoteEntries(url: string, apiToken: string) {
    const source = interval(1000);
    const subscribe = source.subscribe(val => {
      return this.http.get<VoteEntryItem>(sprintf(url + 'live', apiToken));
    });

    return subscribe;
  }

  vote(url: string, apiToken: string, points: number, comment: string, entry: VoteEntryItem) {

    this.cacheService.deleteValue(url);
    return this.http.post<VoteEntryItem>(sprintf(url + '%s/vote', apiToken, entry.id), {
      points: points,
      comment: comment === null ? '' : comment,
      favourite: entry.favourite || entry.vote.special_vote,
      vote_category_id: entry.vote_category_id
    }).subscribe(result => {
      // toast me
      const toast = this.toastController.create({
        message: 'Voted ' + points + ' stars for ' + entry.title,
        duration: 3000,
        position: 'top',
        cssClass: 'toast-success'
      }).then(toasty => {
        toasty.present();
      });
    }, error => {
      // toast me as well
      const toast = this.toastController.create({
        message: 'Voting deadline is over!',
        duration: 3000,
        position: 'top',
        cssClass: 'toast-danger'
      }).then(toasty => {
        toasty.present();
      });
    });
  }

}
