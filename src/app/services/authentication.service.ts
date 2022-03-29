import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user";
import {StorageService} from "./storage.service";
import {map} from "rxjs/operators";

const httpOptions = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public user: User;
  private authenticated = false;

  constructor(public http: HttpClient, private storageService: StorageService) {
    this.storageService.get('user').then(res => {
      if (res != null) {
        console.log(res);
        this.user = res as User;
        this.authenticated = true;
      }
    });
  }

  uniqid() {
    return this.user.uniqid;
  }

  isAuthenticated() {
    return this.authenticated;
  }

  async doLogin(user) {
    this.user = user as User;
    console.log(user);
        await this.storageService.set('user', user);
    this.authenticated = true;

    console.log(this.authenticated);

    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  async doLogout() {
    this.user = {} as User;
    await this.storageService.remove('user');
    this.authenticated = false;
  }

  loginRequest(url, data) {
    const bodyString = JSON.stringify(data); // Stringify payload

    return this.http.post(url + 'login', bodyString, httpOptions).pipe(map(res => res));

    // return Observable.fromPromise(this.storageService.get('local-api-base-url').then(res => {
    //   return res;
    // })).flatMap(res => {
    //   return this.http.post(res + SettingsProvider.variables.LOGIN_API, bodyString, httpOptions)
    //     .map(res => {
    //       return res;
    //     });
    // });

  }

  registrationRequest(data) {
    const bodyString = JSON.stringify(data); // Stringify payload

    // return Observable.fromPromise(this.storageService.get('local-api-base-url').then(res => {
    //   return res;
    // })).flatMap(res => {
    //   return this.http.post(res + SettingsProvider.variables.REGISTRATION_API, bodyString, httpOptions).map(res => {
    //     return res;
    //   });
    // });
  }
}
