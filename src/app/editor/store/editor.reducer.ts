import * as fromEditorActions from './editor.actions';
import { on, Action, createReducer } from '@ngrx/store';

export interface State {
    textareaValue: string;
    selectedElements: Node[];
}

export const initialState: State = {
    textareaValue: '',
    selectedElements: []
};

export function editorReducer(editorState: State | undefined, editorAction: Action) {
    return createReducer(
        initialState,
        on(fromEditorActions.resetTextareaValue, (state, action) => ({
            ...state,
            textareaValue: action.textareaValue
        })),
        on(fromEditorActions.selectText, (state, action) => ({
            ...state,
            selectedElements: action.selectedElements
        }))
    )(editorState, editorAction);
}
