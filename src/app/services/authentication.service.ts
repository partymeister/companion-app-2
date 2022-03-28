import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authenticated: boolean = true;

  constructor() { }

  isAuthenticated() {
    return this.authenticated;
  }
}
