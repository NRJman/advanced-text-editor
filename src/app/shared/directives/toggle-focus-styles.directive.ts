import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appToggleFocusStyles]'
})
export class ToggleFocusStylesDirective {
    constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

    @HostListener('focus')
    public addFocusStyles(): void {
        this.renderer.addClass(this.elementRef.nativeElement, 'focused');
    }

    @HostListener('document:click', ['$event'])
    public removeFocusStyles(event: Event): void {
        const targetClassList: DOMTokenList = (event.target as HTMLElement).classList;

        if (!targetClassList.contains('editing-controller') && !targetClassList.contains('editable-textarea')) {
            this.renderer.removeClass(this.elementRef.nativeElement, 'focused');
        }
    }
}
