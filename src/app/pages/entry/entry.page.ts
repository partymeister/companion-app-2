import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {MenuController, ModalController} from "@ionic/angular";
import {EntryService} from "../../services/entry.service";
import {EntryItem} from "../../models/entry_item";
import {EntryModalPage} from "../entry-modal/entry-modal.page";

@Component({
  selector: 'app-entry',
  templateUrl: './entry.page.html',
  styleUrls: ['./entry.page.scss'],
})
export class EntryPage implements OnInit {

  public entryItems: EntryItem[];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private menuController: MenuController,
    private entryService: EntryService,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
  ) {

    this.entryItems = [];

    activatedRoute.queryParams.subscribe(params => {
      let url = '';

      if (params.dataUrl === undefined) {
        url = 'https://2022.revision-party.net/blog/index.json';
      } else {
        url = params.dataUrl;
      }

      entryService.getData(url, this.authenticationService.apiToken())
        .subscribe((data: EntryItem) => {
          this.entryItems = [...data['data']];
          console.log(this.entryItems);
        });

    });
  }

  async presentDetailModal(entry: EntryItem) {
    const entryModal = await this.modalController.create({
      component: EntryModalPage,
      componentProps: {
        entry
      }
    });
    return await entryModal.present();
  }

  ngOnInit() {
    if (!this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/NewsPage'], {replaceUrl: true}).then(() => {
        this.menuController.open();
      });
    }
  }
}
