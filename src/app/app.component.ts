import {Component, OnInit} from '@angular/core';
import {NavigationService} from "./services/navigation.service";
import {NavigationItem} from "./models/navigation_item";
import {MenuController} from "@ionic/angular";
import {AuthenticationService} from "./services/authentication.service";
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public navigationItems: NavigationItem[];
  public hideMenu = [];

  public childrenOpenState: any = {};

  private menuController: MenuController;
  public authenticationService: AuthenticationService;

  constructor(navigationService: NavigationService, menuController: MenuController, authenticationService: AuthenticationService) {
    this.menuController = menuController;
    this.authenticationService = authenticationService;
    navigationService.getNavigation()
      .subscribe(async (data: NavigationItem) => {
        this.navigationItems = [...data['data'].items];

        this.navigationItems.forEach((value, index) => {
          this.hideMenu[index] = true;
        });
        console.log(this.navigationItems);

        await SplashScreen.hide();
      });

  }

  public showItem(navigationItem) {

    if (navigationItem.isProtected === undefined) {
      return true;
    }

    if (navigationItem.isProtected) {
      if ((this.authenticationService.isAuthenticated() && navigationItem.visibleWhenloggedIn)) {
        return true;
      }
      if (!this.authenticationService.isAuthenticated() && !navigationItem.visibleWhenloggedIn) {
        return true;
      }
    }

    return false;
  }

  public toggleChildren(index) {
    this.hideMenu[index] = !this.hideMenu[index];

    // close all other menus
    this.hideMenu.forEach((value, i) => {
      if (i !== index) {
        this.hideMenu[i] = true;
      }
    });
  }

  public openPage(page) {
    if (page.items && page.items.length > 0) {
      return;
    }
    // this.app.openPage(page);
  }

  public closeMenu() {
    this.menuController.close();
  }

  public showPage(page) {
    return true;
    // return this.app.showPage(page);
  }
}
