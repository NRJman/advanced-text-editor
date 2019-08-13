import * as fromSynonymsActions from './synonyms.actions';
import { on, Action, createReducer } from '@ngrx/store';
import { Synonym } from 'src/app/shared/models/synonym.model';

export interface State {
    searchKey: string;
    synonyms: Synonym[];
    errorMessage: string;
    areSynonymsInProgress: boolean;
}

export const initialState: State = {
    searchKey: '',
    synonyms: null,
    errorMessage: '',
    areSynonymsInProgress: false
};

export function synonymsReducer(synonymsState: State | undefined, synonymsAction: Action) {
    return createReducer(
        initialState,
        on(fromSynonymsActions.startSynonymsUpdating, (state) => ({
            ...state,
            areSynonymsInProgress: true
        })),
        on(fromSynonymsActions.finishSynonymsUpdating, (state, action) => ({
            ...state,
            searchKey: action.searchKey,
            synonyms: action.synonyms,
            errorMessage: '',
            areSynonymsInProgress: false
        })),
        on(fromSynonymsActions.failSynonymsUpdating, (state, action) => ({
            ...state,
            searchKey: action.searchKey,
            synonyms: null,
            errorMessage: state.errorMessage,
            areSynonymsInProgress: false
        })),
    )(synonymsState, synonymsAction);
}
