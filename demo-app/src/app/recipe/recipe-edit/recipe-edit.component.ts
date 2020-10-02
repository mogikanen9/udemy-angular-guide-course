import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: string;
  editMode = false;
  @ViewChild('f') editForm: NgForm;

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = this.id !== undefined;
    });    
  }

  onSubmit(): void {
    console.log('form->', this.editForm);
    this.editForm.form.patchValue({name: 'def name 23'});
  }

}
