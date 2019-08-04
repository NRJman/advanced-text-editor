import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorComponent } from './editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditableTextareaComponent } from './editable-textarea/editable-textarea.component';
import { Store } from '@ngrx/store';
import { EditorService } from './editor.service';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

fdescribe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;
  let debugElement: DebugElement;

  const mockStore = {
    select(...params) {
      console.log(params);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditorComponent,
        EditableTextareaComponent,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: Store, useValue: mockStore },
        EditorService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    spyOn(component, 'handleStoreSelections').and.callFake(() => {
      component.textareaState$ = of('');

      component.synonymsState = {
        searchKey: '',
        synonyms: [],
        errorMessage: ''
      };

      component.selectedElements = [document.createElement('span'), document.createElement('span')];
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should make all selected elements bold', () => {
    let doesAllSelectedElementsHaveClassApplied: boolean;
    const targetCLass = 'bold';
    spyOn(component, 'toggleClassOnSelectedElements').and.callFake(() => {
      component.selectedElements.forEach((element: HTMLElement) => {
        element.classList.add(targetCLass);
      });
    });

    debugElement.query(By.css('.bold-controller')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.toggleClassOnSelectedElements).toHaveBeenCalled();
    doesAllSelectedElementsHaveClassApplied = component.selectedElements.every((element: HTMLElement) =>
      element.classList.contains(targetCLass)
    );

    expect(doesAllSelectedElementsHaveClassApplied).toBe(true);
  });

  it ('should make all selected elements italic', () => {
    let doesAllSelectedElementsHaveClassApplied: boolean;
    const targetCLass = 'italic';
    spyOn(component, 'toggleClassOnSelectedElements').and.callFake(() => {
      component.selectedElements.forEach((element: HTMLElement) => {
        element.classList.add(targetCLass);
      });
    });

    debugElement.query(By.css('.italic-controller')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.toggleClassOnSelectedElements).toHaveBeenCalled();
    doesAllSelectedElementsHaveClassApplied = component.selectedElements.every((element: HTMLElement) =>
      element.classList.contains(targetCLass)
    );

    expect(doesAllSelectedElementsHaveClassApplied).toBe(true);
  });

  it ('should make all selected elements underlined', () => {
    let doesAllSelectedElementsHaveClassApplied: boolean;
    const targetCLass = 'underline';
    spyOn(component, 'toggleClassOnSelectedElements').and.callFake(() => {
      component.selectedElements.forEach((element: HTMLElement) => {
        element.classList.add(targetCLass);
      });
    });

    debugElement.query(By.css('.underline-controller')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.toggleClassOnSelectedElements).toHaveBeenCalled();
    doesAllSelectedElementsHaveClassApplied = component.selectedElements.every((element: HTMLElement) =>
      element.classList.contains(targetCLass)
    );

    expect(doesAllSelectedElementsHaveClassApplied).toBe(true);
  });
});
