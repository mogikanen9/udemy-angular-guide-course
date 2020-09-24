import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  newName = '';
  newAmount = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onIngredientAdded(): void {
    console.log('ShoppingEditComponent#onIngredientAdded...', this.newName, this.newAmount);
    this.ingredientAdded.emit(new Ingredient(this.newName, this.newAmount));
  }
}
