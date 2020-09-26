import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {

    @HostBinding('class.open') isOpen = false;

    constructor(readonly elRef: ElementRef, readonly renderer: Renderer2) { }
    ngOnInit(): void {
        console.log('elRef->', this.elRef);
    }

    @HostListener('click') toggleOpen(): void {
        this.isOpen = !this.isOpen;     
    }
}