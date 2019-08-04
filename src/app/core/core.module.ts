import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from '../store/app.reducers';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { SynonymsEffects } from '../synonyms/store/synonyms.effects';
import { EditorService } from '../editor/editor.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([SynonymsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 15
    })
  ],
  providers: [
    EditorService
  ]
})
export class CoreModule { }
