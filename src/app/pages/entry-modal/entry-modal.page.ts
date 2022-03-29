import {Component, Input, OnInit} from '@angular/core';
import {EntryItem} from "../../models/entry_item";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-entry-modal',
  templateUrl: './entry-modal.page.html',
  styleUrls: ['./entry-modal.page.scss'],
})
export class EntryModalPage implements OnInit {

  @Input() entry: EntryItem;

  constructor(private modalController: ModalController) {
  }

  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
