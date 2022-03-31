import {Component, OnInit} from '@angular/core';
import {EntryItem} from "../../models/entry_item";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {VoteService} from "../../services/vote.service";

@Component({
  selector: 'app-vote',
  templateUrl: './vote.page.html',
  styleUrls: ['./vote.page.scss'],
})
export class VotePage implements OnInit {

  public entryItems: EntryItem[];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private voteService: VoteService,
    private activatedRoute: ActivatedRoute,
  ) {

    this.entryItems = [];

    activatedRoute.queryParams.subscribe(params => {
      voteService.getEntries(params.dataUrl, this.authenticationService.apiToken())
        .subscribe((data: EntryItem) => {
          this.entryItems = [...data['data']];
          console.log(this.entryItems);
        });

    });
  }

  ngOnInit() {
    if (!this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/NewsPage'], {replaceUrl: true});
    }
  }
}
