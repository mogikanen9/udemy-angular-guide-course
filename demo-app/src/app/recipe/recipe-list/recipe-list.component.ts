import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeSelected = new EventEmitter<Recipe>();

  recipies: Recipe[] = [
    new Recipe('Test Recipe', ' Simple Description ',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700%2C636'),
    new Recipe('Test2 Recipe2', ' Simple2 Description2 ',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/epic-summer-salad-7539748.jpg?quality=90&resize=500%2C454')
  ];

  constructor() {
    console.log(this.recipies);
  }

  ngOnInit(): void {
  }

  callNewRecipe(nm: number): void {
    console.log('callNewRecipe called', nm);
  }

  onRecipeSelected(event, item: Recipe): void {
    this.recipeSelected.emit(item);
  }
}
