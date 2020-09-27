import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  providers: [RecipeService]
})
export class RecipeListComponent implements OnInit {

  @Output() recipeSelected = new EventEmitter<Recipe>();

  recipies: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipies = this.recipeService.recipies;
    console.log('RecipeListComponent->', this.recipies);
  }

  callNewRecipe(nm: number): void {
    console.log('callNewRecipe called', nm);
  }

  onRecipeSelected(event, item: Recipe): void {
    this.recipeSelected.emit(item);
  }
}
