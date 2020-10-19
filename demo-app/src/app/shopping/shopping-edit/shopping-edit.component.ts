import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingActions from '../store/shopping.actions';
import { AppState } from '../store/shopping.reducer';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('sf') shoppingForm: NgForm;
  sub: Subscription;
  editMode = false;
  // initialEditItem: Ingredient;

  constructor(    
    private store: Store<AppState>) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {

    this.sub = this.store.select('shoppingList').subscribe(stateData => {
      const item = stateData.editedIngredient;
      if (item !== null) {
        this.editMode = true;
        // this.initialEditItem = { ...item };
        this.shoppingForm.form.patchValue({
          newName: item.name,
          newAmount: item.amount
        });
      } else {
        this.editMode = false;
      }
    });

    /*  this.sub = this.shoppingService.startedEditing.subscribe((item) => {
       this.shoppingForm.form.patchValue({
         newName: item.name,
         newAmount: item.amount
       });
       this.editMode = true;
       this.initialEditItem = item;
     }); */
  }

  onSubmit(): void {
    if (this.shoppingForm.valid) {
      const newName = this.shoppingForm.form.value.newName;
      const newAmount = this.shoppingForm.form.value.newAmount;
      const ing = new Ingredient(newName, newAmount);

      if (this.editMode) {
        // this.shoppingService.updateItem(this.initialEditItem, ing);
        this.store.dispatch(new ShoppingActions.UpdateIngredient(ing));
      } else {
        // this.shoppingService.addIngredient(ing);
        this.store.dispatch(new ShoppingActions.AddIngredient(ing));
      }
    }

    this.shoppingForm.reset();
    this.editMode = false;
  }

  onClear(): void {

    this.shoppingForm.reset();

    this.editMode = false;

    this.store.dispatch(new ShoppingActions.StopEditIngredient());
  }

  onDelete(): void {
    // const newName = this.shoppingForm.form.value.newName;
    // const newAmount = this.shoppingForm.form.value.newAmount;
    // this.shoppingService.deleteItem({ name: newName, amount: newAmount });
    this.store.dispatch(new ShoppingActions.DeleteIngredient());

    this.onClear();
  }
}
