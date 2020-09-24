import { Component, Input, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
