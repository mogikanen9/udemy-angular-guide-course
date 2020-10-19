import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingActions from '../../store/shopping.actions';
import { AppState } from '../../store/shopping.reducer';

@Component({
  selector: 'app-shopping-list-item',
  templateUrl: './shopping-list-item.component.html',
  styleUrls: ['./shopping-list-item.component.css']
})
export class ShoppingListItemComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('displayItem')
  item: {
    name: string;
    amount: number;
  };

  constructor(
    // private shoppingService: ShoppingService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  onEditItem(item: Ingredient): void {
    this.store.dispatch(new ShoppingActions.StartEditIngredient(item));
    // this.shoppingService.markStartEditing(item);
  }
}
