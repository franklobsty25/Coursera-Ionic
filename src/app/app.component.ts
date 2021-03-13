import { Component } from '@angular/core';
import { ModalController, MenuController } from '@ionic/angular';
import { ReservationPage } from './reservation/reservation.page';
import { LoginPage } from './login/login.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/folder/Home', icon: 'home' },
    { title: 'Menu', url: '/menu/Menu', icon: 'list' },
    { title: 'About', url: '/about/About', icon: 'information-circle' },
    { title: 'Contact', url: '/contact/Contact', icon: 'person' },
    { title: 'Favorites', url: '/favorites/Favorites', icon: 'heart'},
  ];
  
  constructor(public modalCtrl: ModalController,
    private menu: MenuController) {}

  async openReserve() {
    const modal = await this.modalCtrl.create({component: ReservationPage});
    return await modal.present();
  }

  async openLogin() {
    const modal = await this.modalCtrl.create({component: LoginPage});
    return await modal.present();
  }

  menuClose() {
    this.menu.close();
  }


}
