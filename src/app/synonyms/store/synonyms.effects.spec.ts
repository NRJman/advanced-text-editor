import * as fromSynonymsActions from './synonyms.actions';
import { Action } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { SynonymsService } from '../synonyms.service';
import { Synonym } from 'src/app/shared/models/synonym.model';
import { Observable } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { SynonymsEffects } from './synonyms.effects';
import { HttpClient } from '@angular/common/http';

fdescribe('SynonymsEffects', () => {
    let actions$: Observable<Action>;
    let synonymsService: SynonymsService;
    const testSynonymsResult: Synonym[] = [
        { word: 'conversation', score: 1, tags: ['a'] },
        { word: 'talk', score: 2, tags: ['b'] }
    ];
    let effects: SynonymsEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SynonymsService,
                provideMockActions(() => actions$)
            ]
        });

        effects = TestBed.get(SynonymsEffects);
        // perform a service definition here
    });

    it('should call FINISH_SYNONYMS_UPDATING action if response is successful', () => {
        const stringToSearchSynonymsFor = 'speech';
        const action: Action = fromSynonymsActions.startSynonymsUpdating({ stringToSearchSynonymsFor });
        const completion: Action = fromSynonymsActions.finishSynonymsUpdating({
            synonyms: testSynonymsResult,
            searchKey: stringToSearchSynonymsFor
        });

        actions$ = hot('-a', { a: action });
        spyOn(synonymsService, 'getSynonyms').and.returnValue(cold('-b|', { a: testSynonymsResult }));
        const expected = cold('--c|', { c: completion });

        expect(effects.startSynonymsUpdating$).toBeObservable(expected);
    });
});
