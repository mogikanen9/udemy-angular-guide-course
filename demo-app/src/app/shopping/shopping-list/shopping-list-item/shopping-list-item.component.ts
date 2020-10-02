import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../../shopping.service';

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
  }

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
  }

  onEditItem(item: Ingredient): void {
    this.shoppingService.markStartEditing(item);
  }
}
