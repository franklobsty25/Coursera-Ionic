import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Guest } from '../../shared/guest';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {
  guest = new Guest(0, false, '');

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss({'dismissed': true});
  }

  onSubmit() {
    console.log(this.guest);
    this.modalCtrl.dismiss();
  }

}
