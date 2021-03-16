import { Component } from '@angular/core';
import { ModalController, MenuController, LoadingController } from '@ionic/angular';
import { ReservationPage } from './reservation/reservation.page';
import { LoginPage } from './login/login.page';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  loading: any = null;

  public appPages = [
    { title: 'Home', url: '/folder/Home', icon: 'home' },
    { title: 'Menu', url: '/menu/Menu', icon: 'list' },
    { title: 'About', url: '/about/About', icon: 'information-circle' },
    { title: 'Contact', url: '/contact/Contact', icon: 'person' },
    { title: 'Favorites', url: '/favorites/Favorites', icon: 'heart'},
  ];
  
  constructor(public modalCtrl: ModalController,
    private menu: MenuController,
    private loadingCtrl: LoadingController,
    private network: Network) {this.networkConnection()}

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

  networkConnection() {
    this.network.onDisconnect().subscribe( async () => {
      if (!this.loading) {
        const loading = await this.loadingCtrl.create({
          message: 'Network Disconnected'
        });
        await loading.present();
      }
    });
    this.network.onConnect().subscribe(() => {
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('We got a wifi connection, woohoo!');
        }
      }, 3000);
      if (this.loading) {
        this.loading.dismiss();
        this.loading = null;
      }
    });
  }


}
