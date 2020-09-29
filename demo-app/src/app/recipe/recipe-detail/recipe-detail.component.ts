import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
  }

  addToShoppingList(): void {
    if (this.recipe) {
      this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
      this.router.navigate(['/shopping-list']);
    } else {
      throw new Error('Recipe is empty/null/undefined!');
    }
  }
}
