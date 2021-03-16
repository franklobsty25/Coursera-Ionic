import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dish } from '../../shared/dish';
import { ToastController } from '@ionic/angular';
import { FavoriteService } from '../services/favorite.service';
import { ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { CommentPage } from '../comment/comment.page';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

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
    public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController, private socialSharing: SocialSharing,
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

  async onOpenComment() {
    const modal = await this.modalCtrl.create({component: CommentPage});

    await modal.present();

    const data = await modal.onDidDismiss();
    this.dish.comments.push(data.data);
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Comment Options',
      buttons: [
        {
          text: 'Add Comment',
          icon: 'chatbubble-ellipses-outline',
          handler: () => {
            this.onOpenComment();
            
          }
        },
        {
          text: 'Share via Facebook',
          icon: 'logo-facebook',
          handler: () => {
            this.socialSharing.shareViaFacebook(
              this.dish.name + ' --- ' + this.dish.description,
              this.BaseURL + this.dish.image, '')
              .then(() => console.log('Posted successfully to Facebook'))
              .catch(() => console.log('Failed to post to Facebook'));
          }
        },
        {
          text: 'Share via Twitter',
          icon: 'logo-twitter',
          handler: () => {
            this.socialSharing.shareViaTwitter(
              this.dish.name + ' -- ' + this.dish.description,
              this.BaseURL + this.dish.image, '')
              .then(() => console.log('Posted successfully to Twitter'))
              .catch(() => console.log('Failed to post to Twitter'));
          }
        },
        {
          text: 'Add Favorite',
          icon: 'heart',
          handler: () => {
            this.addToFavorites();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            console.log('Cancelled clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }


}
