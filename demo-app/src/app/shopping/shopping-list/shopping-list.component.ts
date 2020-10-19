import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

import { Store } from '@ngrx/store';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ ingredients: Ingredient[] }>;
  // private igChangedSub: Subscription;


  constructor(
    private shoppingService: ShoppingService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) { }
  ngOnDestroy(): void {
    // this.igChangedSub.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    //console.log(' this.ingredients->', this.ingredients);
    /* this.ingredients = this.shoppingService.ingredients;
    this.igChangedSub = this.shoppingService.ingredientUpdate.subscribe((updatedIngredients: Ingredient[]) => {
      this.ingredients = updatedIngredients;
    });*/
  }

}
