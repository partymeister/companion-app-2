import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {VoteService} from "../../services/vote.service";
import {FormControl, Validators} from "@angular/forms";
import {VoteEntryItem} from "../../models/vote_entry_item";
import {EntryItem} from "../../models/entry_item";

@Component({
  selector: 'app-vote',
  templateUrl: './vote.page.html',
  styleUrls: ['./vote.page.scss'],
})
export class VotePage implements OnInit {

  public entryItems: VoteEntryItem[];

  public competitions: {} = {};
  public competition_keys: any[] = [];
  public competition_id: number = null;
  public deadlineReached: boolean = false;

  private apiUrl: string;

  formControl: FormControl;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private voteService: VoteService,
    private activatedRoute: ActivatedRoute,
  ) {

    this.formControl = new FormControl();

    this.entryItems = [];

    activatedRoute.queryParams.subscribe(params => {
      this.apiUrl = params.dataUrl;
      voteService.getEntries(params.dataUrl, this.authenticationService.apiToken())
        .subscribe((data: VoteEntryItem) => {
          this.entryItems = [...data['data']];

          this.getVotingEntries();
        });

    });
  }

  ngOnInit() {
    if (!this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/NewsPage'], {replaceUrl: true});
    }

    this.formControl.valueChanges.subscribe(value => {
      this.competition_id = value;
    });
  }

  getVotingEntries(force?, refresher?) {
    this.entryItems.filter(element => {

      this.deadlineReached = element.deadline_reached;

      if (this.competitions[element.competition_id] == null) {
        this.competitions[element.competition_id] = {id: element.competition_id, name: element.competition_name, entries: []};
        this.competition_keys.push(element.competition_id);
      }
      element.rating = 0.1;
      if (element.vote != null) {
        element.rating = element.vote.points === 0 ? 0.1 : element.vote.points;
        element.comment = element.vote.comment;
        element.favourite = element.vote.special_vote;
      }
      this.competitions[element.competition_id].entries.push(element);

      if (this.competition_id === null) {
        this.competition_id = element.competition_id;
      }
    });
  }

  onCommentSend(entry) {
    if (this.deadlineReached) {
      return;
    }
    this.voteService.vote(this.apiUrl, this.authenticationService.apiToken(), entry.rating, entry.comment, entry);
  }

  onFavouriteSend(entry, favourite) {
    if (this.deadlineReached) {
      return;
    }
    for (let e of this.competitions[this.competition_id].entries) {
      e.favourite = false;
    }
    entry.favourite = favourite;
    this.voteService.vote(this.apiUrl, this.authenticationService.apiToken(), entry.rating, entry.comment, entry);
  }

  onModelChange(points, entry) {
    console.log(points);
    if (this.deadlineReached) {
      return;
    }
    this.voteService.vote(this.apiUrl, this.authenticationService.apiToken(), points, entry.comment, entry);
  }

  doRefresh($event: any) {
    this.voteService.getEntries(this.apiUrl, this.authenticationService.apiToken())
      .subscribe((data: VoteEntryItem) => {
        this.entryItems = [...data['data']];
        this.getVotingEntries();
        setTimeout(() => {
          $event.target.complete();
        }, 1000);
      });
  }
}
