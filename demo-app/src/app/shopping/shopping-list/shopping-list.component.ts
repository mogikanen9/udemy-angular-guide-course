import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  private igChangedSub: Subscription;

  constructor(private shoppingService: ShoppingService) { }
  ngOnDestroy(): void {
    this.igChangedSub.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.ingredients;
    this.igChangedSub = this.shoppingService.ingredientUpdate.subscribe((updatedIngredients: Ingredient[]) => {
      this.ingredients = updatedIngredients;
    });
  }
}
