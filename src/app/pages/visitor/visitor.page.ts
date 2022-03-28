import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {VisitorItem} from "../../models/visitor_item";
import {VisitorService} from "../../services/visitor.service";

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.page.html',
  styleUrls: ['./visitor.page.scss'],
})
export class VisitorPage implements OnInit {

  public visitorItems: VisitorItem[];
  public filteredVisitorItems: VisitorItem[];
  private visitorService: VisitorService;

  constructor(visitorService: VisitorService, activatedRoute: ActivatedRoute) {

    this.visitorService = visitorService;

    activatedRoute.queryParams.subscribe(params => {

      visitorService.getData(params.dataUrl)
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
}
