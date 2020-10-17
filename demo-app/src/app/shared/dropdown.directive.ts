import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from '@angular/core';
import { LoggingService } from './logging.service';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {

    @HostBinding('class.open') isOpen = false;

    constructor(readonly elRef: ElementRef, readonly renderer: Renderer2, private loggingService: LoggingService) { }
    ngOnInit(): void {
        this.loggingService.debug('elRef->', this.elRef);
    }

    @HostListener('click') toggleOpen(): void {
        this.isOpen = !this.isOpen;
    }
}