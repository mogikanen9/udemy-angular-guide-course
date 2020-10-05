import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: string;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private activeRoute: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {

    this.activeRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = this.id !== undefined;
      this.initForm();
    });

  }

  get ingCtrls(): AbstractControl[] {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }


  initForm(): void {

    let recipeName = '';
    let recipeDesc = '';
    let imgPath = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipeToEdit = this.recipeService.getRecipeById(this.id);
      recipeName = recipeToEdit.name;
      recipeDesc = recipeToEdit.description;
      imgPath = recipeToEdit.imagePath;
      if (recipeToEdit.ingredients && recipeToEdit.ingredients.length > 0) {

        recipeToEdit.ingredients.forEach((ing) => {          
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ing.name),
            'amount': new FormControl(ing.amount)
          }));
        });
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'desc': new FormControl(recipeDesc, Validators.required),
      'imgPath': new FormControl(imgPath, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onSubmit(): void {
    console.log('form->', this.recipeForm);
  }

}
