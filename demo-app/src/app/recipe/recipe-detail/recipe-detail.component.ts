import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;

  constructor(private recipeService: RecipeService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      const rid = params['id'];
      if (rid) {
        this.recipe = this.recipeService.getRecipeById(rid);
      }
    });
  }

  addToShoppingList(): void {
    if (this.recipe) {
      this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
      this.router.navigate(['/shopping-list']);
    } else {
      throw new Error('Recipe is empty/null/undefined!');
    }
  }

  onEditRecipeClick(): void {
    this.router.navigate(['edit'], { relativeTo: this.activeRoute });
  }
}
