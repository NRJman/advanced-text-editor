import { createAction, props } from '@ngrx/store';

export const resetTextareaValue = createAction('[Editor] Reset Textarea Value', props<{ textareaValue: string }>());
export const selectText = createAction('[Editor] Select Text', props<{ selectedElements: Node[] }>());
