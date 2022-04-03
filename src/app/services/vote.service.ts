import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {sprintf} from 'sprintf-js';
import {VoteEntryItem} from "../models/vote_entry_item";
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(
    private http: HttpClient,
    private toastController: ToastController
  ) {
  }

  getEntries(url: string, apiToken: string) {
    return this.http.get<VoteEntryItem>(sprintf(url + 'entries', apiToken));
  }

  vote(url: string, apiToken: string, points: number, comment: string, entry: VoteEntryItem) {

    return this.http.post<VoteEntryItem>(sprintf(url + '%s/vote', apiToken, entry.id), {
      points: points,
      comment: comment === null ? '' : comment,
      favourite: entry.favourite,
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
