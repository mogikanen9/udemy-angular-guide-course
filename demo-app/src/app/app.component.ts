import { Component } from '@angular/core';
import { AppPage } from './AppPage';
import { RecipeService } from './recipe/recipe.service';
import { ShoppingService } from './shopping/shopping.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ShoppingService, RecipeService]
})
export class AppComponent {
}

