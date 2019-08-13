import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { EditableTextareaComponent } from './editor/editable-textarea/editable-textarea.component';
import { SynonymsComponent } from './synonyms/synonyms.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    EditableTextareaComponent,
    SynonymsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
