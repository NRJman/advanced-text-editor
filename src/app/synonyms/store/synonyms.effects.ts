import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as fromSynonymsActions from './synonyms.actions';
import { startSynonymsUpdating } from './synonyms.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Synonym } from 'src/app/shared/models/synonym.model';
import { of } from 'rxjs';

@Injectable()
export class SynonymsEffects {
    constructor(private actions$: Actions, private httpClient: HttpClient) { }

    startSynonymsUpdating$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromSynonymsActions.startSynonymsUpdating),
            map((action) => {
                return action.stringToSearchSynonymsFor
                    .split('\xa0')
                    .join('+');
            }),
            switchMap((searchKey: string) => {
                return this.httpClient.get('https://api.datamuse.com/words', {
                    params: {
                        ml: searchKey
                    }
                })
                .pipe(
                    switchMap((value: Synonym[]) => {
                        return of (fromSynonymsActions.finishSynonymsUpdating({
                            searchKey,
                            synonyms: value
                        }));
                    }),
                    catchError((error) => {
                        return of(fromSynonymsActions.failSynonymsUpdating({
                            searchKey,
                            error: 'Oops, something went wrong!'
                        }));
                    })
                );
            })
        )
    );
}
