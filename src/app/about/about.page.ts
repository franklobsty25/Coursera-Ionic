import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Leader } from '../../shared/leader';
import { LeaderService } from '../services/leader.service';
import { ProcessHttpmsgService } from '../services/process-httpmsg.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  public about: string;
  leaderErrMess: string;
  leaders: Leader[];

  constructor(private activatedRoute: ActivatedRoute,
    private leaderService: LeaderService,
    private processHttpmsgService: ProcessHttpmsgService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.about = this.activatedRoute.snapshot.paramMap.get('id');

    this.leaderService.getLeaders()
    .subscribe(leaders => this.leaders = leaders),
    errmess => this.leaderErrMess = <any> errmess;
  }

}
