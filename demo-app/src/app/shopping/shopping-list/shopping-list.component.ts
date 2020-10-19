import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { AppState } from '../store/shopping.reducer';




@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ ingredients: Ingredient[] }>;
  // private igChangedSub: Subscription;


  constructor(
    private store: Store<AppState>) { }
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
