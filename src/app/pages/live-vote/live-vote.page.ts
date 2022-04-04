import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {VoteService} from "../../services/vote.service";
import {FormControl} from "@angular/forms";
import {VoteEntryItem} from "../../models/vote_entry_item";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject, timer} from "rxjs";
import {retry, share, switchMap, takeUntil} from "rxjs/operators";
import {sprintf} from 'sprintf-js';
import {VisitorItem} from "../../models/visitor_item";

@Component({
  selector: 'app-live-vote',
  templateUrl: './live-vote.page.html',
  styleUrls: ['./live-vote.page.scss'],
})
export class LiveVotePage implements OnInit, OnDestroy {

  private liveVoteEntries$: Observable<VoteEntryItem[]>;
  public liveVoteEntries: VoteEntryItem[] = [];
  private stopPolling = new Subject();
  private apiUrl: string;
  public deadlineReached: boolean = false;
  private dirtyStates = {};

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService,
              private voteService: VoteService,
              private activatedRoute: ActivatedRoute,
              private router: Router
  ) {

    activatedRoute.queryParams.subscribe(params => {
      this.apiUrl = params.dataUrl;

      this.liveVoteEntries$ = timer(1, 10000).pipe(
        switchMap(() => http.get<VoteEntryItem[]>(sprintf(this.apiUrl + 'live', this.authenticationService.apiToken()))),
        retry(),
        share(),
        takeUntil(this.stopPolling)
      );

    });
  }

  getAllEntries(): VoteEntryItem[] {

    this.liveVoteEntries$.subscribe(data => {

      const liveVoteEntries = data['data'];
      this.deadlineReached = data['data'][0].deadline_reached;

      // recreate dirty state
      for (const newEntry of liveVoteEntries) {
        for (const oldEntry of this.liveVoteEntries) {
          if (oldEntry.is_dirty && oldEntry.id === newEntry.id) {
            newEntry.vote.comment = oldEntry.vote.comment;
            newEntry.is_dirty = true;
          }
        }
      }

      this.liveVoteEntries = liveVoteEntries;
    });


    return this.liveVoteEntries;
  }

  ngOnInit() {
    if (!this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/NewsPage'], {replaceUrl: true});
    }

    this.getAllEntries();
  }

  ngOnDestroy() {
    this.stopPolling.next();
  }

  markDirty(text, entry) {
    entry.is_dirty = true;
  }

  onCommentSend(entry) {
    if (this.deadlineReached) {
      return;
    }

    entry.is_dirty = false;
    console.log(entry);
    this.voteService.vote(this.apiUrl, this.authenticationService.apiToken(), entry.vote.points, entry.vote.comment, entry);
  }

  onFavouriteSend(entry, favourite) {
    if (this.deadlineReached) {
      return;
    }
    for (const e of this.liveVoteEntries) {
      if (e.id !== entry.id) {
        e.vote.special_vote = false;
      }
    }

    entry.is_dirty = false;
    entry.vote.special_vote = favourite;

    // Hack for compatibility to VotePage (yeah I know...)
    entry.favourite = favourite;
    this.voteService.vote(this.apiUrl, this.authenticationService.apiToken(), entry.vote.points, entry.vote.comment, entry);
  }

  onModelChange(points, entry) {
    console.log(points);
    if (this.deadlineReached) {
      return;
    }

    entry.is_dirty = false;
    entry.vote.points = points;
    this.voteService.vote(this.apiUrl, this.authenticationService.apiToken(), points, entry.vote.comment, entry);
  }

  // Not sure if this is required on voting page
  /*doRefresh($event: any) {
    this.getAllEntries();
    setTimeout(() => {
      $event.target.complete();
    }, 1000);
  }*/
}
