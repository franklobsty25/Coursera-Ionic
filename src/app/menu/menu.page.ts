import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Dish } from '../../shared/dish';
import { DishService } from '../services/dish.service';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public menu: string;
  dishes: Dish[];
  errMess: string;
  favorite: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private dishService: DishService,
    private router: Router,
    private favoriteService: FavoriteService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.menu = this.activatedRoute.snapshot.paramMap.get('id');

    this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes,
      errmess => this.errMess = <any>errmess);
  }

  dishSelected(event, dish) {
    //let navigationExtras: NavigationExtras = dish;
    this.router.navigate(['/detail', JSON.stringify(dish)]);
  }

  addToFavorites(dish: Dish) {
    console.log('Adding to Favorites ', dish.id);
    this.favorite = this.favoriteService.addFavorite(dish.id);
  }

}
