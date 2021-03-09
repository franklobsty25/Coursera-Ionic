import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Dish } from '../../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public menu: string;
  dishes: Dish[];
  errMess: string;

  constructor(private activatedRoute: ActivatedRoute,
    private dishService: DishService,
    private router: Router,
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

}
