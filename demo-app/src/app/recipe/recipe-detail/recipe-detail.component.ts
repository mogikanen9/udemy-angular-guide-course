import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { map } from 'rxjs/operators';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      const rid = params['id'];
      if (rid) {
        this.store.select('recipes')
          .pipe(
            map((state) => state.recipes.find((value, index) => value.rid === rid))
          ).subscribe(foundRecipe => {
            this.recipe = foundRecipe;
          });
      }
    });
  }

  addToShoppingList(): void {
    if (this.recipe) {
      this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
      // this.router.navigate(['/shopping-list']);
    } else {
      throw new Error('Recipe is empty/null/undefined!');
    }
  }

  onEditRecipeClick(): void {
    this.router.navigate(['edit'], { relativeTo: this.activeRoute });
  }

  onDeleteRecipeClick(): void {
    if (this.recipe) {
      this.store.dispatch(new RecipeActions.DeleteRecipe(this.recipe));
      this.router.navigate(['/recipes']);
    }
  }
}
