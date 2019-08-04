import * as fromSynonymsActions from './synonyms.actions';
import { on, Action, createReducer } from '@ngrx/store';
import { Synonym } from 'src/app/shared/models/synonym.model';

export interface State {
    searchKey: string;
    synonyms: Synonym[];
    errorMessage: string;
}

export const initialState: State = {
    searchKey: '',
    synonyms: [],
    errorMessage: ''
};

export function synonymsReducer(synonymsState: State | undefined, synonymsAction: Action) {
    return createReducer(
        initialState,
        on(fromSynonymsActions.finishSynonymsUpdating, (state, action) => ({
            ...state,
            searchKey: action.searchKey,
            synonyms: action.synonyms,
            errorMessage: ''
        })),
        on(fromSynonymsActions.failSynonymsUpdating, (state, action) => ({
            ...state,
            searchKey: action.searchKey,
            synonyms: [],
            errorMessage: state.errorMessage
        })),
    )(synonymsState, synonymsAction);
}
