import { ActionReducerMap } from '@ngrx/store';

import * as fromUi from './reducers/ui.reducers';

export interface AppState {
  ui: fromUi.UiState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: fromUi.uiReducer
};
