import { Injectable } from '@angular/core';
import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { baseURL } from '../../shared/baseurl';
import { ProcessHttpmsgService } from '../services/process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(public http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgService) { }

    getDishes(): Observable<Dish[]> {
      return this.http.get<Dish[]>(baseURL + 'dishes')
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getDish(id: number): Observable<Dish> {
      //return of(DISHES[id]).pipe(delay(2000));
      return this.http.get<Dish>(baseURL + 'dishes/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getFeaturedDish(): Observable<Dish> {
      return this.http.get<Dish[]>(baseURL + 'dishes?featured=true')
      .pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }


}
