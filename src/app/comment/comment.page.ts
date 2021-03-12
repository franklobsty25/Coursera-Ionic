import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Comment } from '../../shared/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {
  comment: Comment;

  constructor(public modalCtrl: ModalController) {
    this.comment = {
      author: '',
      rating: 5,
      comment: '',
      date: ''
    };

   }

  ngOnInit() {
  }

  dismiss(data) {
    this.modalCtrl.dismiss(data);
  }

  onSubmit() {
    this.comment.date = new Date().toISOString();
    this.modalCtrl.dismiss(this.comment);
  }

}
