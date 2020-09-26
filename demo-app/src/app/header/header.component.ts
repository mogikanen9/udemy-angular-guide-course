import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AppPage } from '../AppPage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() menuItemClicked = new EventEmitter<AppPage>();

  constructor() { }

  ngOnInit(): void {
  }

  onMenuItemClicked(pageName: string): void {
    console.log('onMenuItemClicked#pageName->', pageName);
    this.menuItemClicked.emit(pageName === AppPage.recipe ? AppPage.recipe : AppPage.shopping_list);
  }
}
