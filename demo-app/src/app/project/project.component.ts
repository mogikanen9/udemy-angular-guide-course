import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projectForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      'name': new FormControl('Please, provide name', [Validators.required, Validators.min(2)]),
      'email': new FormControl(null, [Validators.required, Validators.email])
    });
  }

  onSubmit(): void {
    console.log('this.projectForm.value->', this.projectForm.value);
  }
}
