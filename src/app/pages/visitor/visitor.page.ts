import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {VisitorItem} from "../../models/visitor_item";
import {VisitorService} from "../../services/visitor.service";
import {SponsorItem} from "../../models/sponsor_item";

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.page.html',
  styleUrls: ['./visitor.page.scss'],
})
export class VisitorPage implements OnInit {

  public visitorItems: VisitorItem[];
  public filteredVisitorItems: VisitorItem[];
  private url = '';
  loading = false;
  constructor(private visitorService: VisitorService, activatedRoute: ActivatedRoute) {

    activatedRoute.queryParams.subscribe(params => {
      this.url = params.dataUrl;
      visitorService.getData(this.url)
        .subscribe((data: VisitorItem) => {
          this.visitorItems = [...data['data']];
          this.filteredVisitorItems = this.visitorItems;
          console.log(this.visitorItems);
        });
    });

  }

  filterVisitors(event) {
    this.filteredVisitorItems = this.visitorService.filterItems(this.visitorItems, event.target.value);
  }

  ngOnInit() {
  }

  doRefresh($event: any) {
    this.loading = true;
    this.visitorService.getData(this.url)
      .subscribe((data: VisitorItem) => {
        this.visitorItems = [...data['data']];
        this.filteredVisitorItems = this.visitorItems;
        console.log(this.visitorItems);
        setTimeout(() => {
          $event.target.complete();
          this.loading = false;
        }, 1000);
      });
  }
}
