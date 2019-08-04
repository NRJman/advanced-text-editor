import { Directive, HostListener, PLATFORM_ID, Inject, ElementRef } from '@angular/core';
import { EditorService } from 'src/app/editor/editor.service';
import * as fromApp from 'src/app/store/app.reducers';
import * as fromEditorActions from './../../editor/store/editor.actions';
import { Store } from '@ngrx/store';
import { isPlatformBrowser } from '@angular/common';

@Directive({
    selector: '[appSelectionChangeListener]'
})
export class SelectionChangeListenerDirective {
    private hostElement: HTMLElement = this.elementRef.nativeElement;

    constructor(
        private editorService: EditorService,
        private store: Store<fromApp.State>,
        private elementRef: ElementRef,
        @Inject(PLATFORM_ID) private platformId: object
    ) {}

    @HostListener('document:selectionchange')
    private onSelectionChange(event: Event): void {
        if (isPlatformBrowser(this.platformId) && window.getSelection().getRangeAt) {
            const startElement: HTMLElement = window.getSelection().getRangeAt(0).startContainer.parentElement;

            if (this.isElementDescendant(this.hostElement, startElement)) {
                const selectedElements: Node[] = this.editorService.getSelectedElements(this.elementRef.nativeElement.parentElement);

                this.store.dispatch(fromEditorActions.selectText({ selectedElements }));
            }
        }
    }

    private isElementDescendant(possibleParent: HTMLElement, possibleChild: HTMLElement) {
        let node = possibleChild.parentNode;

        while (node != null) {
            if (node.isSameNode(possibleParent)) {
                return true;
            }

            node = node.parentNode;
        }

        return false;
    }
}
