import { ActionReducerMap } from '@ngrx/store';
import * as fromEditor from './../editor/store/editor.reducer';
import * as fromSynonyms from './../synonyms/store/synonyms.reducer';

export interface State {
    editor: fromEditor.State;
    synonyms: fromSynonyms.State;
}

export const reducers: ActionReducerMap<State> = {
    editor: fromEditor.editorReducer,
    synonyms: fromSynonyms.synonymsReducer
};
