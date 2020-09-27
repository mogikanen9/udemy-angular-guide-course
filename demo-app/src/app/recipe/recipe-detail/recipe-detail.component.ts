import { Component, Input, OnInit } from '@angular/core';
import { ShoppingService } from 'src/app/shopping/shopping.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe: Recipe;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
  }

  addToShoppingList(): void {
    if (this.recipe) {
      this.recipe.ingredients.forEach(ing => this.shoppingService.addIngredient(ing));
    } else {
      throw new Error('Recipe is empty/null/undefined!');
    }
  }
}
