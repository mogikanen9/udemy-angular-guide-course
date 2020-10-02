import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projectForm: FormGroup;
  projectStatuses = [
    { key: 'na', value: 'Please, select' },
    { key: 'in-progress', value: 'In Progress' },
    { key: 'complete', value: 'Complete' }];

  questionValues = ['How old are you?', 'What is you place fo birth?', 'What is your name?'];

  constructor() { }

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.min(2)], [this.forbiddenProjectName]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl('in-progress'),
      'questions': new FormArray([ new FormControl(null)])
    });
  }

  get myquestions(): FormArray {
    return this.projectForm.get('questions') as FormArray;
  }

  onSubmit(): void {
    console.log('this.projectForm.value->', this.projectForm.value);
  }

  forbiddenProjectName(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Test') {
          resolve({ 'projectNameIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
  }

  addQuestion(): void {
    const myQ = this.myquestions;
    if (this.myquestions.length < this.questionValues.length) {
      myQ.push(new FormControl(null));
    }
  }
}
