import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() item: Recipe;

  constructor(private recipeService: RecipeService) {
  }


  ngOnInit(): void {
  }


  handleOnClick(event, item): void {
    this.recipeService.recepeSelected.emit(item);
  }
}
