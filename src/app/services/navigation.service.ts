import {Injectable} from '@angular/core';
import {NavigationItem} from "../models/navigation_item";
import {HttpClient} from "@angular/common/http";
import {LogService} from "./log.service";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getNavigation() {
    return this.http.get<NavigationItem>('https://2024.revision-party.net/app/navigation.json');
  }
}
