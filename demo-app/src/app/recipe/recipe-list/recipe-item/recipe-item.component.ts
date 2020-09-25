import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit, OnChanges {

  @Input() item: {
    name: string;
    description: string;
    imagePath: string;
  }

  constructor() {
    console.log('RecipeItemComponent#constructor');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('RecipeItemComponent#changes', changes);
  }

  ngOnInit(): void {
    console.log('RecipeItemComponent#constructor');
  }

}
