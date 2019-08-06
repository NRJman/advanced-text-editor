import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SelectionChangeListenerDirective } from './directives/selection-change-listener.directive';
import { ToggleFocusStylesDirective } from './directives/toggle-focus-styles.directive';

@NgModule({
  declarations: [
    SelectionChangeListenerDirective,
    ToggleFocusStylesDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    SelectionChangeListenerDirective,
    ToggleFocusStylesDirective
  ]
})
export class SharedModule { }
