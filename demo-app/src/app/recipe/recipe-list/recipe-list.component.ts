import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.reducer';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipeSub: Subscription;

  recipes: Recipe[] = [];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private store: Store<AppState>) { }

  ngOnDestroy(): void {
    this.recipeSub.unsubscribe();
  }

  ngOnInit(): void {

    this.store.select('recipes')
      .pipe(map((recipesState) => recipesState.recipes))
      .subscribe((recipes) => {
        this.recipes = recipes;
      });
  }

  callNewRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.activeRoute });
  }

}
