import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dish } from '../../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess: string;
  promoErrMess: string;
  leaderErrMess: string;

  constructor(private activatedRoute: ActivatedRoute,
    private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');

    this.dishService.getFeaturedDish()
    .subscribe(dish => this.dish = dish,
      errmess => this.dishErrMess = <any>errmess);
    
    this.promotionService.getFeaturedPromotion()
    .subscribe(promotion => this.promotion = promotion,
      errmess => this.promoErrMess = <any>errmess);

    this.leaderService.getFeaturedLeader()
    .subscribe(leader => this.leader = leader,
      errmess => this.leaderErrMess = <any>errmess);
  }

}
