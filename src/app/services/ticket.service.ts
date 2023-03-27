import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TicketItem} from '../models/ticket_item';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {StorageService} from './storage.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) {
  }

  ticketRequest(code: string): Observable<TicketItem> {
    let data$;

    const body = new URLSearchParams();
    body.set('token', environment.dtToken);
    body.set('code', code);

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    // eslint-disable-next-line prefer-const
    data$ = this.http.post(environment.dtUrl, body.toString(), options).pipe(map(res => {
      return {
        order_number: res['data'].Betreff,
        type: res['data'].TicketArt,
        code: res['data'].Code,
        first_name: res['data'].Vorname,
        last_name: res['data'].Nachname
      };
    }));

    return data$;
  }

  async removeItem(ticketItem) {
    const items = await this.getData();
    items.forEach((item, index) => {
      if (ticketItem.code === item.code) {
        items.splice(index, 1);
      }
    });
    this.storageService.set('tickets', items).then(res => res);
    return await this.getData();
  }

  async addItem(ticketItem) {
    const items = await this.getData();

    // Check for duplicates
    let duplicate = false;
    for (let r of items) {
      if (r.code === ticketItem.code) {
        duplicate = true;
      }
    }

    if (!duplicate) {
      items.push(ticketItem);
    }

    this.storageService.set('tickets', items).then(res => res);

    return await this.getData();
  }


  async getData(): Promise<TicketItem[]> {
    return this.storageService.get('tickets').then(res => res == null ? [] : res);
  }
}
