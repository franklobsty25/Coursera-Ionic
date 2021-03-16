import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { User } from '../../shared/user';
import { RegPage } from '../reg/reg.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User = {username: '', password: '', remember: true};

  constructor(public modalCtrl: ModalController,
    private storage: Storage) {

      storage.get('user').then(user => {
        if (user) {
          this.user = user;
        }
        else {
          console.log('user not defined');
        }
      });
     }

  ngOnInit() {
  }

  async openRegister() {
    const modal = await this.modalCtrl.create({component: RegPage});
    await modal.present();

    modal.onDidDismiss().then(() => this.dismiss());
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    console.log(this.user);

    if (this.user.remember) {
      this.storage.set('user', this.user);
      this.modalCtrl.dismiss();
    }
    else {
      this.storage.remove('user');
    }

  }

}
