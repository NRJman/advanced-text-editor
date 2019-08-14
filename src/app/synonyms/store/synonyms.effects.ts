import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as fromSynonymsActions from './synonyms.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Synonym } from 'src/app/shared/models/synonym.model';
import { of } from 'rxjs';
import { SynonymsService } from '../synonyms.service';

@Injectable()
export class SynonymsEffects {
    constructor(private actions$: Actions, private synonymsService: SynonymsService) { }

    startSynonymsUpdating$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromSynonymsActions.startSynonymsUpdating),
            map((action) => {
                return action.stringToSearchSynonymsFor
                    .split('\xa0')
                    .join('+');
            }),
            switchMap((searchKey: string) => {
                return this.synonymsService.getSynonyms(searchKey).pipe(
                    switchMap((value: Synonym[]) => {
                        return of(fromSynonymsActions.finishSynonymsUpdating({
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
