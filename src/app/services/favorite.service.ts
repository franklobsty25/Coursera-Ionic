import { Injectable } from '@angular/core';
import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DishService } from '../services/dish.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  favorites: Array<any>

  constructor(private dishService: DishService) { this.favorites = []; }

  addFavorite(id: number): boolean {
    if (!this.isFavorite(id))
      this.favorites.push(id);
    return true;
  }

  isFavorite(id: number): boolean {
    return this.favorites.some(el => el === id);
  }

  getFavorites(): Observable<Dish[]> {
    return this.dishService.getDishes()
    .pipe(map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id))));
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id);
    if (index >= 0) {

      this.favorites.splice(index, 1);
      return this.getFavorites();
    }
    else {

      console.log('Deleting non-existant favorate ', id);
      return Observable.throw('Deleting non-existant favorite ' + id);
    }
  }


}
