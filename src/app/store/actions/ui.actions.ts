import { Action } from '@ngrx/store';

export const ACTIVATE_LOADING = '[UI Loading] Loading..';
export const INACTIVATE_LOADING = '[UI Loading]  End loading state...';

export class ActivateLoadingAction implements Action {
  readonly type = ACTIVATE_LOADING;
}

export class InactivateLoadingAction implements Action {
  readonly type = INACTIVATE_LOADING;
}

export type uiActions = ActivateLoadingAction
  | InactivateLoadingAction;
