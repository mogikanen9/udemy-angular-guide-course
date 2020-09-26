import { Component } from '@angular/core';
import { AppPage } from './AppPage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo-app';
  currentPage = AppPage.recipe;

  showRecipe(): boolean {
    return this.currentPage === AppPage.recipe;
  }

  showShoppingList(): boolean {
    return this.currentPage === AppPage.shopping_list;
  }

  setCurrentPage(page: AppPage): void {
    console.log('page->',page);
    this.currentPage = page;
  }
}

