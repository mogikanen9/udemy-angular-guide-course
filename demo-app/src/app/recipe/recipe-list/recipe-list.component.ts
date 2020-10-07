import { Route } from '@angular/compiler/src/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipeSub: Subscription;

  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService, private router: Router, private activeRoute: ActivatedRoute) { }
  ngOnDestroy(): void {
    this.recipeSub.unsubscribe();
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.recipes;
    this.recipeSub = this.recipeService.recipeUpdates.subscribe((recipes) => {
      this.recipes = recipes;
    });
  }

  callNewRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.activeRoute });
  }

}
