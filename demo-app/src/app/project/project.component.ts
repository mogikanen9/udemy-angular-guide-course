import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
      'name': new FormControl('Please, provide name'),
      'email': new FormControl(null)
    });
  }

  onSubmit(): void {
    console.log('this.projectForm.value->',this.projectForm.value);
  }
}
