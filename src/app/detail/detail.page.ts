import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
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

  addToFavorites() {
    console.log('Adding to Favorites', this.dish.id);
    this.favorite = this.favoriteService.addFavorite(this.dish.id);
  }


}
