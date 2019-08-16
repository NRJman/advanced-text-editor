import { async, TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { EditorComponent } from './editor.component';
import { DebugElement } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditableTextareaComponent } from './editable-textarea/editable-textarea.component';
import { EditorService } from './editor.service';
import * as fromEditorActions from './store/editor.actions';
import * as fromSynonymsActions from './../synonyms/store/synonyms.actions';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

interface MockStore {
  dispatch: (action: any) => void;
}

describe('EditorComponent', () => {
  let fixture: ComponentFixture<EditorComponent>;
  let component: EditorComponent;
  let debugElement: DebugElement;
  let editorService: EditorService;
  let store: MockStore;
  const mockStore: MockStore = {
    dispatch(action: any) { }
  };
  let getSynonymsBtn;
  let getTextareaValueBtn;
  let spyDispatch;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditorComponent,
        EditableTextareaComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: Store, useValue: mockStore },
        EditorService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;

    spyOn(component, 'handleStoreSelections').and.callFake(() => {
      component.textareaState$ = of('');
      component.synonymsState = {
        searchKey: '',
        synonyms: [],
        errorMessage: '',
        areSynonymsInProgress: false
      };
      component.selectedElements = [];
    });
    spyOn(component, 'ngOnDestroy');

    fixture.detectChanges();

    getTextareaValueBtn = debugElement.query(By.css('.extraction-controller[type="submit"]'));
    getSynonymsBtn = debugElement.query(By.css('.extraction-controller[type="button"]'));
    editorService = TestBed.get(EditorService);
    store = TestBed.get(Store);
    spyDispatch = spyOn(store, 'dispatch');
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should disable GET_SYNONYMS button if there are no any selected elements', () => {
    const spyUpdateSynonymsStateFn = spyOn(component, 'updateSynonymsState').and.callFake(() => {
      console.log('popavsia');
    });

    getSynonymsBtn.nativeElement.click();
    fixture.detectChanges();

    expect(spyUpdateSynonymsStateFn).not.toHaveBeenCalled();
  });

  it('should dispatch SELECT_TEXT action with correct payload on GET_SYNONYMS button click', () => {
    spyOn(editorService, 'getSelectedText').and.returnValue('');

    component.selectedElements = [null, null];
    fixture.detectChanges();
    getSynonymsBtn.triggerEventHandler('click', null);

    expect(spyDispatch).toHaveBeenCalledWith(fromEditorActions.selectText({ selectedElements: component.selectedElements }));
  });

  it('should not dispatch START_SYNONYMS_UPDATING action if search key length is lower than 2', () => {
    const stringToSearchSynonymsFor = 'a';

    spyOn(editorService, 'getSelectedText').and.returnValue(stringToSearchSynonymsFor);

    component.selectedElements = [null, null];
    fixture.detectChanges();
    getSynonymsBtn.triggerEventHandler('click', null);

    expect(spyDispatch).not.toHaveBeenCalledWith(fromSynonymsActions.startSynonymsUpdating({ stringToSearchSynonymsFor }));;
  });

  it('should dispatch START_SYNONYMS_UPDATING action with correct payload if search key length is at least 2', () => {
    const stringToSearchSynonymsFor = 'ab';

    spyOn(editorService, 'getSelectedText').and.returnValue(stringToSearchSynonymsFor);

    component.selectedElements = [null, null];
    fixture.detectChanges();
    getSynonymsBtn.triggerEventHandler('click', null);

    expect(spyDispatch).toHaveBeenCalledWith(fromSynonymsActions.startSynonymsUpdating({ stringToSearchSynonymsFor }));
  });

  it('should not dispatch RESET_TEXTAREA_VALUE action if form is invalid', () => {
    component.editorForm.controls.textArea.setValue('');

    getTextareaValueBtn.nativeElement.click();

    expect(spyDispatch).not.toHaveBeenCalledWith(
      fromEditorActions.resetTextareaValue({ textareaValue: component.editorForm.controls.textArea.value })
    );
  });

  it('should dispatch RESET_TEXTAREA_VALUE action with correct payload if form is valid', () => {
    component.editorForm.controls.textArea.setValue('a');
    fixture.detectChanges();

    getTextareaValueBtn.nativeElement.click();

    expect(spyDispatch).toHaveBeenCalledWith(
      fromEditorActions.resetTextareaValue({ textareaValue: component.editorForm.controls.textArea.value })
    );
  });

});
