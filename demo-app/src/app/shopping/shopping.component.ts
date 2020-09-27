import { Component, OnInit } from '@angular/core';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css'],
  providers: [ShoppingService]
})
export class ShoppingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
