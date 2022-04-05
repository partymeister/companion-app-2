import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {MenuController, ModalController} from "@ionic/angular";
import {EntryService} from "../../services/entry.service";
import {EntryItem} from "../../models/entry_item";
import {EntryModalPage} from "../entry-modal/entry-modal.page";
import {SeminarItem} from "../../models/seminar_item";

@Component({
  selector: 'app-entry',
  templateUrl: './entry.page.html',
  styleUrls: ['./entry.page.scss'],
})
export class EntryPage implements OnInit {

  public entryItems: EntryItem[];
  private url = '';
  loading = false;
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
      this.url = params.dataUrl;
      entryService.getData(this.url, this.authenticationService.apiToken())
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

  doRefresh($event: any) {
    this.loading = true;
    this.entryService.getData(this.url, this.authenticationService.apiToken())
      .subscribe((data: EntryItem) => {
        this.entryItems = [...data['data']];
        console.log(this.entryItems);
        setTimeout(() => {
          $event.target.complete();
          this.loading = false;
        }, 1000);
      });
  }
}
