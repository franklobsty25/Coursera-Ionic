import { Component, OnInit, Inject } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { Dish } from '../../shared/dish';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favorites: Dish[];
  errMess: string;

  constructor(private favoriteService: FavoriteService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.favoriteService.getFavorites()
    .subscribe(favorites => this.favorites = favorites,
      errmess => this.errMess = errmess);
  }

  async deleteFavorite(id: number) {
    console.log('delete ', id);
    const alert = await this.alertCtrl.create({
      header: 'Confirm Delete',
      message: 'Do you want to delete favorite ' + id,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Deleted cancelled');
          }
        },
        {
          text: 'Delete',
          handler: async () => {
            const loading = await this.loadingCtrl.create({
              message: 'Deleting...',
              duration: 3000
            });
            const toast = await this.toastCtrl.create({
              message: 'Dish ' + id + ' deleted successfylly',
              duration: 3000
            });
            await loading.present();
            this.favoriteService.deleteFavorite(id)
            .subscribe(favorites => { this.favorites = favorites; loading.dismiss(); toast.present(); },
              errmess => { this.errMess = errmess; loading.dismiss(); });
          }
        }
      ]
    });
    alert.present();
  }

}
