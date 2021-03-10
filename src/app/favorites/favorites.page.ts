import { Component, OnInit, Inject } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { Dish } from '../../shared/dish';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favorites: Dish[];
  errMess: string;

  constructor(private favoriteService: FavoriteService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.favoriteService.getFavorites()
    .subscribe(favorites => this.favorites = favorites,
      errmess => this.errMess = errmess);
  }

  deleteFavorite(id: number) {
    console.log('delete ', id);
    this.favoriteService.deleteFavorite(id)
    .subscribe(favorites => this.favorites = favorites,
      errmess => this.errMess = errmess);
  }

}
