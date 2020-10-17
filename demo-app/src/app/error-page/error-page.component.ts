import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { LoggingService } from '../shared/logging.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  errorMsg = '';

  constructor(private route: ActivatedRoute, private loggingService: LoggingService) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {      
      this.loggingService.error('error data->', data);
      this.errorMsg = data['message'];
    })
  }

}
