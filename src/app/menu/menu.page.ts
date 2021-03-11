import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dish } from '../../shared/dish';
import { DishService } from '../services/dish.service';
import { FavoriteService } from '../services/favorite.service';
import { ToastController } from '@ionic/angular';

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
    public toastCtrl: ToastController,
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

  async addToFavorites(dish: Dish) {
    console.log('Adding to Favorites ', dish.id);
    this.favorite = this.favoriteService.addFavorite(dish.id);
    const toast = await this.toastCtrl.create({
      message: 'Dish ' + dish.id + ' added as a favorite successfully',
      position: 'middle',
      duration: 3000
    });
    toast.present();
  }

}
