import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }

  onFetchClick(): void {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onSaveClick(): void {
    this.dataStorageService.saveRecepies();
  }

}
