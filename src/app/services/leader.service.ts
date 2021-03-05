import { Injectable } from '@angular/core';
import { Leader } from '../../shared/leader';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { baseURL } from '../../shared/baseurl';
import { ProcessHttpmsgService } from '../services/process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(public http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgService) { }

    getLeaders(): Observable<Leader[]> {
      return this.http.get<Leader[]>(baseURL + 'leaders')
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }
  
    getLeaderId(id: string): Observable<Leader> {
      //return of(Leader[id]).pipe(delay(2000));
      return this.http.get<Leader>(baseURL + 'leaders/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }
  
    getFeaturedLeader(): Observable<Leader> {
      return this.http.get<Leader[]>(baseURL + 'leaders?featured=true')
      .pipe(map(leaders => leaders[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }


}
