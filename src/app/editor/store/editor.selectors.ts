import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEditor from './editor.reducer';

export const getEditorState = createFeatureSelector('editor');
export const getTextareaValue = createSelector(getEditorState, (editorState: fromEditor.State) => editorState.textareaValue);
export const getSelectedElements = createSelector(getEditorState, (editorState: fromEditor.State) => editorState.selectedElements);
