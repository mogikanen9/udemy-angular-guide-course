import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import * as ShoppingActions from '../store/shopping.actions';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('sf') shoppingForm: NgForm;
  sub: Subscription;
  editMode = false;
  initialEditItem: Ingredient;

  constructor(
    private shoppingService: ShoppingService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) { }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.shoppingService.startedEditing.subscribe((item) => {
      this.shoppingForm.form.patchValue({
        newName: item.name,
        newAmount: item.amount
      });
      this.editMode = true;
      this.initialEditItem = item;
    });
  }

  onSubmit(): void {
    if (this.shoppingForm.valid) {
      const newName = this.shoppingForm.form.value.newName;
      const newAmount = this.shoppingForm.form.value.newAmount;
      const ing = new Ingredient(newName, newAmount);

      if (this.editMode) {
        //this.shoppingService.updateItem(this.initialEditItem, ing);
        this.store.dispatch(new ShoppingActions.UpdateIngredient({ oldItem: this.initialEditItem, newItem: ing }));
      } else {
        //this.shoppingService.addIngredient(ing);
        this.store.dispatch(new ShoppingActions.AddIngredient(ing));
      }
    }

    this.shoppingForm.reset();
    this.editMode = false;
  }

  onClear(): void {

    this.shoppingForm.reset();

    this.editMode = false;
  }

  onDelete(): void {
    const newName = this.shoppingForm.form.value.newName;
    const newAmount = this.shoppingForm.form.value.newAmount;
    //this.shoppingService.deleteItem({ name: newName, amount: newAmount });
    this.store.dispatch(new ShoppingActions.DeleteIngredient({ name: newName, amount: newAmount }));

    this.onClear();
  }
}
