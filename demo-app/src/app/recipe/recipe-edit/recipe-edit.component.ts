import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
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
            'name': new FormControl(ing.name, Validators.required),
            'amount': new FormControl(ing.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
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

  onAddIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onRemoveIngredient(i: number): void {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(i);
  }

  onSubmit(): void {

    const name = this.recipeForm.get('name').value;

    const description = this.recipeForm.get('desc').value;

    const imgPath = this.recipeForm.get('imgPath').value;

    const ingredients = new Array<Ingredient>();

    (this.recipeForm.get('ingredients') as FormArray).controls.map((formGroup: FormGroup) => {
      const nameValue = formGroup.get('name').value;
      const amountValue = formGroup.get('amount').value;
      return new Ingredient(nameValue, amountValue);
    }).forEach((ingItem) => ingredients.push(ingItem));

    if (this.editMode) {
      this.recipeService.updateRecipe(new Recipe(this.id, name, description, imgPath, ingredients));
    } else {
      this.recipeService.addRecipe(new Recipe(this.recipeService.genNewRecupeId(), name, description, imgPath, ingredients));
    }

  }
}
