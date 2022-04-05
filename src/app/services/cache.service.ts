import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import * as moment from 'moment';
import hash from 'hash-it';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  readonly CACHE_DURATION_IN_MINUTES = 5;

  private cache: {
    [id: string]: {
      expires: Date;
      value: Observable<any>;
    }
  } = {};

  constructor() {
  }

  getValue(object: any): Observable<any> {
    const key = hash(object).toString();
    const item = this.cache[key];
    if (!item) {
      return null;
    }

    if (moment().isAfter(item.expires)) {
      return null;
    }

    return item.value;
  }

  setValue(value: Observable<any>, object: any) {
    const key = hash(object).toString();
    const expires = moment()
      .add(this.CACHE_DURATION_IN_MINUTES, 'minutes')
      .toDate();
    this.cache[key] = {expires, value};
  }

  clearCache() {
    this.cache = null;
  }
}
