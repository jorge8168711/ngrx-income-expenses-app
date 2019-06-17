import { ActionReducerMap } from '@ngrx/store';

import * as fromUi from './reducers/ui.reducers';
import * as fromAuth from './reducers/auth.reducers';

export interface AppState {
  ui: fromUi.UiState;
  auth: fromAuth.AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer,
};
