import { Component, OnInit } from '@angular/core';
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

  newName = '';
  newAmount = 0;


  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
  }

  onIngredientAdded(): void {
    this.shoppingService.addIngredient(new Ingredient(this.newName, this.newAmount));
  }
}
