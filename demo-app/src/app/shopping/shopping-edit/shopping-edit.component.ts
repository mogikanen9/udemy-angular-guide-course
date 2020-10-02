import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { LoggingService } from '../../shared/logging.service';
import { ShoppingService } from '../shopping.service';



@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
  providers: [LoggingService]
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('sf') shoppingForm: NgForm;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.shoppingForm.valid) {
      const newName = this.shoppingForm.form.value.newName;
      const newAmount = this.shoppingForm.form.value.newAmount;
      this.shoppingService.addIngredient(new Ingredient(newName, newAmount));
    }
  }

  onClear(): void {
    this.shoppingForm.form.patchValue({
      newName: '',
      newAmount: ''
    });
  }
}
