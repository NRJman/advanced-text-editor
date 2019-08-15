import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { EditorComponent } from './editor.component';
import { DebugElement } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditableTextareaComponent } from './editable-textarea/editable-textarea.component';
import { EditorService } from './editor.service';
import * as fromEditorSelectors from './store/editor.selectors';
import { of, BehaviorSubject, Observable } from 'rxjs';

describe('EditorComponent', () => {
  let fixture: ComponentFixture<EditorComponent>;
  let component: EditorComponent;
  let debugElement: DebugElement;
  const mockStore = {
    dispatch(action: any) { }
  };

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
      component.selectedElements = [document.createElement('span'), document.createElement('span')];
    });

    fixture.detectChanges();

  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should disable GET_SYNONYMS button if there are no any selected elements', () => {
    spyOn(component, 'ngOnDestroy');
    
  });
});
