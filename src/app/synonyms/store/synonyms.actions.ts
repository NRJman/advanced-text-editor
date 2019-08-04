import { createAction, props } from '@ngrx/store';
import { Synonym } from 'src/app/shared/models/synonym.model';

export const startSynonymsUpdating = createAction(
    '[Synonyms] Start Synonyms Updating',
    props<{ stringToSearchSynonymsFor: string }>()
);

export const finishSynonymsUpdating = createAction(
    '[Synonyms] Finish Synonyms Updating',
    props<{ searchKey: string, synonyms: Synonym[] }>()
);

export const failSynonymsUpdating = createAction(
    '[Synonyms] Fail Synonyms Updating',
    props<{ searchKey: string, error: string }>()
);