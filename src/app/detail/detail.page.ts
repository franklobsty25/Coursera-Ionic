import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dish } from '../../shared/dish';
import { ToastController } from '@ionic/angular';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router, private favoriteService: FavoriteService,
    public toastCtrl: ToastController,
    @Inject('BaseURL') private BaseURL) {

      this.dish = JSON.parse(this.activatedRoute.snapshot.paramMap.get('id'));
      this.favorite = this.favoriteService.isFavorite(this.dish.id);
      this.numcomments = this.dish.comments.length;

      let total = 0;
      this.dish.comments.forEach(comment => total += comment.rating);
      this.avgstars = (total/this.numcomments).toFixed(2);

     }

  ngOnInit() {
  }

  async addToFavorites() {
    console.log('Adding to Favorites', this.dish.id);
    this.favorite = this.favoriteService.addFavorite(this.dish.id);
    const toast = await this.toastCtrl.create({
      message: 'Dish ' + this.dish.id + ' added as a favorite successfully',
      position: 'middle',
      duration: 3000
    });
    toast.present();
  }


}
