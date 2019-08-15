import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { EditorComponent } from './editor.component';
import { DebugElement } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditableTextareaComponent } from './editable-textarea/editable-textarea.component';
import { EditorService } from './editor.service';

describe('EditorComponent', () => {
  let fixture: ComponentFixture<EditorComponent>;
  let component: EditorComponent;
  let debugElement: DebugElement;
  const mockStore = jasmine.createSpyObj('Store', ['select']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        EditorComponent,
        EditableTextareaComponent
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
    component = debugElement.componentInstance;

    fixture.detectChanges();
  });

  it('should disable GET_SYNONYMS button if there are no any selected elements', () => {
    
  });
});
