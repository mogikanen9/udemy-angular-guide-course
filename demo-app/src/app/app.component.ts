import { Component } from '@angular/core';
import { AppPage } from './AppPage';
import { ShoppingService } from './shopping/shopping.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ShoppingService]
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
    this.currentPage = page;
  }
}

