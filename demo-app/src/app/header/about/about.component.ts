import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {

  @Input() data: string;

  // tslint:disable-next-line:no-output-native
  @Output() close = new EventEmitter<void>();

  constructor() { }
  ngOnDestroy(): void {

  }

  ngOnInit(): void {

  }

  onClose(): void {
    console.log('About#onCLose clicked');
    this.close.emit();
  }

}
