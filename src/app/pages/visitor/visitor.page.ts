import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {VisitorItem} from "../../models/visitor_item";
import {VisitorService} from "../../services/visitor.service";
import {CountryService} from '../../services/country.service';

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
  countries: any[] = [];
  selectedCountry = '';
  countrySelected = false;
  visitorsFromCountryCount = 0;
  selectedCountryIso = '';
  loadingCountries = false;

  constructor(private countryService: CountryService, private visitorService: VisitorService, activatedRoute: ActivatedRoute) {
    this.countries = countryService.getCountries();
    activatedRoute.queryParams.subscribe(params => {
      this.url = params.dataUrl;
      visitorService.getData(this.url)
        .subscribe((data: VisitorItem[]) => {
          this.visitorItems = data;
          this.filteredVisitorItems = this.visitorItems;
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
    this.visitorService.getData(this.url, true)
      .subscribe((data: VisitorItem[]) => {
        this.visitorItems = data;
        this.filteredVisitorItems = this.visitorItems;
        setTimeout(() => {
          $event.target.complete();
          this.loading = false;
        }, 1000);
      });
  }

  filterVisitorsByCountry(event: any) {
    this.selectedCountryIso = event.target.value;
    this.countrySelected = true;
    this.filteredVisitorItems = this.visitorItems.filter(visitor => visitor.country_iso_3166_1 === event.target.value);
    this.visitorsFromCountryCount = this.filteredVisitorItems.length;
    this.selectedCountry = this.countryService.findCountryByIso(event.target.value);
  }

  resetCountryFilter(event) {
    this.loadingCountries = true;
    this.selectedCountryIso = null;
    setTimeout(() => {
      this.countrySelected = false;
      this.filteredVisitorItems = this.visitorItems;
      this.loadingCountries = false;
    },500);
  }
}
