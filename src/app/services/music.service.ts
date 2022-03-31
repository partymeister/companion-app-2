import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MusicItem} from "../models/music_item";

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getData(url: string) {
    return this.http.get<MusicItem>(url);
  }}
