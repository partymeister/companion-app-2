import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private menuController: MenuController
  ) { }

  ngOnInit() {
    this.logout();
  }

  async logout() {
    await this.authenticationService.doLogout();
    await this.router.navigate(['/NewsPage'], { replaceUrl: true});
    await this.menuController.open();
  }
}
