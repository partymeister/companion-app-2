import {Component, OnInit} from '@angular/core';
import {NavigationService} from './services/navigation.service';
import {NavigationItem} from './models/navigation_item';
import {MenuController, Platform} from '@ionic/angular';
import {AuthenticationService} from './services/authentication.service';
import {SplashScreen} from '@capacitor/splash-screen';
import OneSignal from 'onesignal-cordova-plugin';

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

  constructor(navigationService: NavigationService, menuController: MenuController, authenticationService: AuthenticationService, private platform: Platform) {
    this.menuController = menuController;
    this.authenticationService = authenticationService;
    navigationService.getNavigation()
      .subscribe(async (data: NavigationItem) => {
        this.navigationItems = [...data['data'].items];

        this.navigationItems.forEach((value, index) => {
          this.hideMenu[index] = true;
        });

        await SplashScreen.hide();
      });


    this.OneSignalInit();
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

  // Call this function when your app starts
  OneSignalInit(): void {
    this.platform.ready().then(() => {
      if (this.platform.is('capacitor')) {
        OneSignal.setAppId('3fdb8164-8438-4afb-b4f4-95ec317ebd88');

        OneSignal.promptForPushNotificationsWithUserResponse((accepted) => {
          console.log('User accepted notifications: ' + accepted);
        });
      }
    });
  }
}
