import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: string;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.recipeForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'imgPath': new FormControl(null, Validators.required)
    });

    this.activeRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = this.id !== undefined;
    });
  }

  onSubmit(): void {
    console.log('form->', this.recipeForm);
  }

}
