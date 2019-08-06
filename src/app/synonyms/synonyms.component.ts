import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromSynonyms from './store/synonyms.reducer';
import * as fromApp from './../store/app.reducers';
import { takeUntil } from 'rxjs/operators';
import { UnsubscriberService } from '../shared/services/unsubscriber.service';
import { Synonym } from '../shared/models/synonym.model';

@Component({
  selector: 'app-synonyms',
  templateUrl: './synonyms.component.html',
  styleUrls: ['./synonyms.component.scss']
})
export class SynonymsComponent extends UnsubscriberService implements OnInit, OnDestroy {
  public synonymsState: fromSynonyms.State;
  public synonymsErrorMessage: string;

  constructor(private store: Store<fromApp.State>) {
    super();
  }

  ngOnInit(): void {
    this.store.select('synonyms')
      .pipe(
        takeUntil(this.subscriptionController$$)
      )
      .subscribe((state: fromSynonyms.State) => {
        const synonymsList: Synonym[] = state.synonyms;

        if (synonymsList) {
          this.synonymsState = {
            ...state,
            synonyms: state.synonyms.slice(0, 30)
          };
        } else {
          this.synonymsState = state;
        }

        this.synonymsErrorMessage = state.errorMessage;
      });
  }

  ngOnDestroy(): void {

  }

}
