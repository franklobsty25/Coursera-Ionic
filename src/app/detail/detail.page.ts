import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';

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

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    @Inject('BaseURL') private BaseURL) {

      this.dish = JSON.parse(this.activatedRoute.snapshot.paramMap.get('id'));
      this.numcomments = this.dish.comments.length;

      let total = 0;
      this.dish.comments.forEach(comment => total += comment.rating);
      this.avgstars = (total/this.numcomments).toFixed(2);

     }

  ngOnInit() {
  }


}
