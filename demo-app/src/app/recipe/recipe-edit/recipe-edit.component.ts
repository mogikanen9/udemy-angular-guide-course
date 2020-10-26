import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { AppState } from 'src/app/store/app.reducer';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { map } from 'rxjs/operators';
import * as RecipeActions from '../store/recipe.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  id: string;
  editMode = false;
  recipeForm: FormGroup;
  recipeStoreSub: Subscription;

  constructor(
    private activeRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private store: Store<AppState>) { }

  ngOnDestroy(): void {
    if (this.recipeStoreSub) {
      this.recipeStoreSub.unsubscribe();
    }
  }

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

      this.recipeStoreSub = this.store.select('recipes').pipe(
        map(
          (state) => state.recipes.find((value, index) => value.rid === this.id)
        )

      ).subscribe((recipeToEdit) => {

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

      });

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
      const updatedRecipe = new Recipe(this.id, name, description, imgPath, ingredients);
      this.store.dispatch(new RecipeActions.UpdateRecipe(updatedRecipe));
      this.router.navigate(['/recipes', this.id]);
    } else {

      const newRecipe = new Recipe(this.recipeService.genNewRecupeId(), name, description, imgPath, ingredients);
      this.store.dispatch(new RecipeActions.AddRecipe(newRecipe));
      this.router.navigate(['/recipes']);
    }


  }

  onCancel(): void {
    this.recipeForm.reset();
    this.router.navigate(['../', this.activeRoute]);
  }
}
