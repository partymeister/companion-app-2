import {Component, Input, OnInit} from '@angular/core';
import {TicketItem} from '../../models/ticket_item';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-ticket-modal',
  templateUrl: './ticket-modal.page.html',
  styleUrls: ['./ticket-modal.page.scss'],
})
export class TicketModalPage implements OnInit {

  @Input() ticket: TicketItem;

  constructor(private modalController: ModalController) {
  }

  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can 'dismiss' itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
