import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {VisitorItem} from "../models/visitor_item";

@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getData(url: string) {
    return this.http.get<VisitorItem>(url);
  }

  filterItems(visitors, searchTerm) {

    if (searchTerm === '') {
      return visitors;
    }

    return visitors.filter((visitor) => {
      const a = visitor.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      const b = visitor.group.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      const c = visitor.country_iso_3166_1.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      if (a || b || c) {
        return visitor;
      }
    });

  }
}
