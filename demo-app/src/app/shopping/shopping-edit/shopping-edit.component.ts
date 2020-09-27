import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';

import { LoggingService } from '../../shared/logging.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
  providers: [LoggingService]
})
export class ShoppingEditComponent implements OnInit {

  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  newName = '';
  newAmount = 0;


  constructor(private loggingService: LoggingService) { }

  ngOnInit(): void {
  }

  onIngredientAdded(): void {
    this.ingredientAdded.emit(new Ingredient(this.newName, this.newAmount));
    this.loggingService.log('ingredient was aded');
  }
}
