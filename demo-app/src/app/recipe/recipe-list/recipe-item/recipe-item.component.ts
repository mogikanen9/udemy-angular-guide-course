import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() item: Recipe;
  @Output() recipeSelected = new EventEmitter<Recipe>();

  constructor() {
    console.log('RecipeItemComponent#constructor');
  }


  ngOnInit(): void {
    console.log('RecipeItemComponent#constructor');
  }


  handleOnClick(event, item): void {
    this.recipeSelected.emit(item);
  }
}
