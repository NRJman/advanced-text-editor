import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as fromApp from './../store/app.reducers';
import * as fromEditorActions from './store/editor.actions';
import * as fromEditorSelectors from './store/editor.selectors';
import * as fromSynonymsActions from './../synonyms/store/synonyms.actions';
import * as fromSynonyms from './../synonyms/store/synonyms.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { UnsubscriberService } from '../shared/services/unsubscriber.service';
import { EditorService } from './editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent extends UnsubscriberService implements OnInit, OnDestroy {
  public editorForm: FormGroup;
  public textareaState$: Observable<string>;
  public synonymsState: fromSynonyms.State;
  public synonymsErrorMessage: string;
  public selectedElements: Node[];

  @ViewChild('editableTextarea', { read: ElementRef }) private textarea: ElementRef;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromApp.State>,
    private renderer: Renderer2,
    private editorService: EditorService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    super();
  }

  public onEditorFormSubmit(): void {
    this.store.dispatch(fromEditorActions.resetTextareaValue({ textareaValue: this.editorForm.controls.textArea.value }));
  }

  public updateSynonymsState(): void {
    if (isPlatformBrowser(this.platformId) && window.getSelection().getRangeAt) {
      const stringToSearchSynonymsFor = this.editorService.getSelectedText(this.textarea.nativeElement);
      const selectedElements: Node[] = this.editorService.getSelectedElements(this.textarea.nativeElement);

      this.store.dispatch(fromEditorActions.selectText({ selectedElements }));

      if (stringToSearchSynonymsFor.length > 1) {
        this.store.dispatch(fromSynonymsActions.startSynonymsUpdating({ stringToSearchSynonymsFor }));
      }
    }
  }

  public toggleClassOnSelectedElements(targetClass: 'bold' | 'italic' | 'underline'): void {
    const selectedElementsLength: number = this.selectedElements.length;

    if (selectedElementsLength !== 0) {
      const doesFirstElementHaveTargetClass: boolean = (this.selectedElements[0] as HTMLElement).classList.contains(targetClass);

      if (selectedElementsLength > 1) {
        if (!doesFirstElementHaveTargetClass) {
          this.selectedElements.forEach((element: HTMLElement) => {
            this.renderer.addClass(element, targetClass);
          });
        } else {
          this.selectedElements.forEach((element: HTMLElement) => {
            this.renderer.removeClass(element, targetClass);
          });
        }

        return;
      }

      if (!doesFirstElementHaveTargetClass) {
        (this.selectedElements[0] as HTMLElement).classList.add(targetClass);

        return;
      }

      (this.selectedElements[0] as HTMLElement).classList.remove(targetClass);
    }
  }

  public handleStoreSelections(): void {
    this.store.select('synonyms')
      .pipe(
        takeUntil(this.subscriptionController$$)
      )
      .subscribe((state: fromSynonyms.State) => {
        this.synonymsState = {
          ...state,
          synonyms: state.synonyms.slice(0, 30)
        };

        this.synonymsErrorMessage = state.errorMessage;
      });

    this.store.select(fromEditorSelectors.getSelectedElements)
      .pipe(
        takeUntil(this.subscriptionController$$)
      )
      .subscribe((elements: Node[]) => {
        this.selectedElements = elements;
      });

    this.textareaState$ = this.store.select(fromEditorSelectors.getTextareaValue);
  }

  ngOnInit() {
    this.editorForm = this.fb.group({
      textArea: ['']
    });

    this.handleStoreSelections();
  }

  ngOnDestroy() {
    this.ngOnDestroy();
  }

}
