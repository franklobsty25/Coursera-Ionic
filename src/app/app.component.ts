import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/folder/Home', icon: 'home' },
    { title: 'Menu', url: '/menu/Menu', icon: 'list' },
    { title: 'About', url: '/about/About', icon: 'information-circle' },
    { title: 'Contact', url: '/contact/Contact', icon: 'person' },
    { title: 'Favorites', url: '/favorites/Favorites', icon: 'heart'},
  ];
  
  constructor() {}
}
