import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SatelliteItem} from "../models/satellite_item";

@Injectable({
  providedIn: 'root'
})
export class SatelliteService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getData(url: string) {
    return this.http.get<SatelliteItem>(url);
  }
}
