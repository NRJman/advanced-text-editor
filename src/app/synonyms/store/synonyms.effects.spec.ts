import * as fromSynonymsActions from './synonyms.actions';
import { Action } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { SynonymsService } from '../synonyms.service';
import { Synonym } from 'src/app/shared/models/synonym.model';
import { Observable, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { SynonymsEffects } from './synonyms.effects';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SynonymsEffects', () => {
    let actions$: Observable<Action>;
    let synonymsService: SynonymsService;
    let effects: SynonymsEffects;
    let mockHttpResponse: Synonym[] | Error;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                SynonymsService,
                SynonymsEffects,
                provideMockActions(() => actions$)
            ]
        });

        effects = TestBed.get(SynonymsEffects);
        synonymsService = TestBed.get(SynonymsService);
    });

    it('should call FINISH_SYNONYMS_UPDATING action if response is successful', () => {
        mockHttpResponse = [
            { word: 'conversation', score: 1, tags: ['a'] },
            { word: 'talk', score: 2, tags: ['b'] }
        ];
        const stringToSearchSynonymsFor = 'speech';
        const action: Action = fromSynonymsActions.startSynonymsUpdating({ stringToSearchSynonymsFor });
        const completion: Action = fromSynonymsActions.finishSynonymsUpdating({
            synonyms: mockHttpResponse,
            searchKey: stringToSearchSynonymsFor
        });

        actions$ = hot('-a', { a: action });
        spyOn(synonymsService, 'getSynonyms').and.returnValue(cold('-b|', { b: mockHttpResponse }));
        const expected$ = cold('--c', { c: completion });

        expect(effects.startSynonymsUpdating$).toBeObservable(expected$);
    });

    it('should call FAIL_SYNONYMS_UPDATING action if response is an error', () => {
        const stringToSearchSynonymsFor = 'nomatter';
        const action: Action = fromSynonymsActions.startSynonymsUpdating({ stringToSearchSynonymsFor });
        const completion: Action = fromSynonymsActions.failSynonymsUpdating({
            searchKey: stringToSearchSynonymsFor,
            error: 'Oops, something went wrong!'
        });

        actions$ = hot('-a', { a: action });
        spyOn(synonymsService, 'getSynonyms').and.returnValue(throwError('Message'));
        const expected$ = cold('-b', { b: completion });

        expect(effects.startSynonymsUpdating$).toBeObservable(expected$);
    });
});
