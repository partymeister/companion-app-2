import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {AlertController, MenuController, ModalController} from '@ionic/angular';
import {TicketService} from '../../services/ticket.service';
import {TicketItem} from '../../models/ticket_item';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BarcodeService} from '../../services/barcode.service';
import {TicketModalPage} from '../ticket-modal/ticket-modal.page';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {

  public ticketItems: TicketItem[];
  ticketForm: FormGroup;
  loading = false;
  success = false;
  error = false;
  private url = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private menuController: MenuController,
    private alertController: AlertController,
    private ticketService: TicketService,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private barcodeService: BarcodeService
  ) {

    this.ticketItems = [];

    this.ticketForm = this.formBuilder.group({
      last_name: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      code: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    });

    this.ticketForm.valueChanges.subscribe(data => {
      if (data.code) {
        this.ticketForm.patchValue({code: data.code.toUpperCase()}, {onlySelf: true, emitEvent: false});
      }
    });

    ticketService.getData().then(tickets => {
      this.ticketItems = tickets;
    });
  }

  async openCamera(event) {
    event.stopPropagation();
    const barcode = await this.barcodeService.startScan();
    this.ticketForm.patchValue({code: barcode.toUpperCase()}, {onlySelf: true, emitEvent: false});
    this.success = true;
    await this.barcodeService.stopScan();
    setTimeout(() => {
      this.success = false;
    }, 3000);
  }

  async removeTicket(ticket) {
    this.ticketService.removeItem(ticket).then(tickets => {
      this.ticketItems = tickets;
    });
  }

  async presentTicketAlert() {
    const alert = await this.alertController.create({
      header: 'Adding ticket unsuccessful :(',
      message: 'Last name or code do not match each other or do not exist in the database',
      buttons: ['OK']
    });
    await alert.present();
  }

  submitTicket() {
    this.ticketService.ticketRequest(this.ticketForm.get('code').value).subscribe(result => {
      if (this.ticketForm.get('last_name').value.toLowerCase() !== result.last_name.toLowerCase()) {
        this.presentTicketAlert();
      } else {
        this.ticketService.addItem(result).then(tickets => {
          this.ticketItems = tickets;
        });
        this.ticketForm.reset();
      }
    }, err => {
      console.log(err);
      this.presentTicketAlert();
    });
  }

  async presentDetailModal(ticket: TicketItem) {
    const ticketModal = await this.modalController.create({
      component: TicketModalPage,
      componentProps: {
        ticket
      }
    });
    return await ticketModal.present();
  }

  ngOnInit() {
  }
}
