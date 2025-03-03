import { createAction, props } from '@ngrx/store';

export const switchDialogModeAction = createAction(
  '[Dialog] Switch Dialog Mode',
  props<{ visible: boolean; isEditing: boolean }>()
);

export const retriveDialogAction = createAction(
  '[Dialog] Retrive Dialog Mode And Data',
  props<{ loadedData: any }>()
);

export const getDialogDataAction = createAction(
  '[Dialog] Get Dialog Data',
  props<{ data: any }>()
);
